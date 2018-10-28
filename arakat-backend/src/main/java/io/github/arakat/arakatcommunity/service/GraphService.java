package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.exception.GraphRunFailedException;
import io.github.arakat.arakatcommunity.model.TablePath;
import io.github.arakat.arakatcommunity.model.Task;
import io.github.arakat.arakatcommunity.utils.FileOperationUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.util.*;

@Service
public class GraphService {

    private AppPropertyValues appPropertyValues;
    private FileOperationUtils fileOperationUtils;
    private TablePathService tablePathService;
    private TaskService taskService;
    private AppService appService;

    @Autowired
    public GraphService(AppPropertyValues appPropertyValues, FileOperationUtils fileOperationUtils,
                        TablePathService tablePathService, TaskService taskService, AppService appService) {
        this.appPropertyValues = appPropertyValues;
        this.fileOperationUtils = fileOperationUtils;
        this.tablePathService = tablePathService;
        this.taskService = taskService;
        this.appService = appService;
    }

    public JSONObject addConfigToDagProperties(String graph) {
        JSONObject graphJson = new JSONObject(graph);

        JSONObject dagProperties = (JSONObject) graphJson.get("dag_properties");

        JSONObject sparkOperatorConfDetails = new JSONObject();
        JSONObject conf = new JSONObject();

        conf.put("spark.pyspark.python", appPropertyValues.getPythonVersion());
        sparkOperatorConfDetails.put("conn_id", appPropertyValues.getConnectionId());
        sparkOperatorConfDetails.put("depends_on_past", false);
        sparkOperatorConfDetails.put("conf", conf);

        dagProperties.put("spark_operator_conf", sparkOperatorConfDetails);
        dagProperties.put("code_base_path", appPropertyValues.getApplicationPath());

        graphJson.put("dag_properties", dagProperties);

        return graphJson;
    }

    public String postGraphAndDagPropsToCore(String graphToPost) {
        RestTemplate restTemplate = new RestTemplate();

        restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
        restTemplate.getMessageConverters().add(new StringHttpMessageConverter());

        String uri = appPropertyValues.getArakatCoreUrl() + ":" + appPropertyValues.getArakatCorePort() + "/" + appPropertyValues.getArakatCorePostingGraphEndpoint();

        Map<String, String> vars = new HashMap<>();

        return restTemplate.postForObject(uri, graphToPost, String.class, vars);
    }

    public void sendGeneratedCodeToAirflow(String dagAndTasks) throws IOException {
        JSONObject dagAndTasksJson = new JSONObject(dagAndTasks);
        JSONObject dagsJson = (JSONObject) dagAndTasksJson.get("codes");

        for (String key : iteratorToIterable(dagsJson.keys())) {
            JSONObject entry = dagsJson.getJSONObject(key);

            for (String taskKey : iteratorToIterable(entry.keys())) {
                if (entry.get(taskKey) instanceof JSONObject) {
                    JSONObject tasks = entry.getJSONObject(taskKey);

                    for (String subKey : iteratorToIterable(tasks.keys())) {
                        String pysparkCode = (String) tasks.get(subKey);
                        String fileName = key + "_" + subKey + ".py";

                        fileOperationUtils.writeToFile(fileName, pysparkCode, appPropertyValues.getSparkCodesOutputFileLocation());
                    }
                } else {
                    String airflowSchedulerCode = (String) entry.get(taskKey);
                    fileOperationUtils.writeToFile(key, airflowSchedulerCode, appPropertyValues.getDagOutputFileLocation());
                }
            }
        }
    }

    public void checkRunResult(String responseFromCore) throws GraphRunFailedException {
        if (!isGraphSuccessful(responseFromCore)) {
            // TODO: if there is any messages available from the core side, display it as well.
            throw new GraphRunFailedException("");
        }
    }

//    private void getWrittenTopics(String responseFromCore) {
//        JSONObject response = new JSONObject(responseFromCore);
//        JSONObject additionalInfo = (JSONObject) response.get("additional_info");
//        JSONObject writtenTopics = (JSONObject) additionalInfo.get("written_topics");
//
//
//        return getWrittenContentAsList(writtenTopics);
//    }

    public void saveWrittenTablesToDatabase(String responseFromCore) {
        JSONObject response = new JSONObject(responseFromCore);
        JSONObject additionalInfo = (JSONObject) response.get("additional_info");
        JSONObject writtenContent = (JSONObject) additionalInfo.get("written_tables");
        List<Task> tasksToSave = new ArrayList<>();
        List<TablePath> tablesToSave = new ArrayList<>();

        for (String appId : iteratorToIterable(writtenContent.keys())) {
            JSONObject tasks = writtenContent.getJSONObject(appId);

            for (String task : iteratorToIterable(tasks.keys())) {
                JSONArray tables = tasks.getJSONArray(task);

                for(Object table : tables) {
                    TablePath savedTablePath = tablePathService.saveAndGetTable(
                            new JSONObject(table.toString()).get("table_path").toString());

                    tablesToSave.add(savedTablePath);
                }

                Task savedTask = taskService.saveAndGetTask(task, tablesToSave);
                tasksToSave.add(savedTask);
                tablesToSave = new ArrayList<>();
            }

            appService.saveApp(appId, tasksToSave);
            tasksToSave = new ArrayList<>();
        }
    }

    private Boolean isGraphSuccessful(String responseFromCore) {
        JSONObject response = new JSONObject(responseFromCore);

        JSONObject errors = (JSONObject) response.get("errors");
        JSONObject taskErrors = (JSONObject) errors.get("task_errors");
        JSONArray schedulerErrors = (JSONArray) errors.get("scheduler_errors");

        return taskErrors.length() == 0 && schedulerErrors.length() == 0;
    }

    private <T> Iterable<T> iteratorToIterable(Iterator<T> iterator) {
        return () -> iterator;
    }
}
