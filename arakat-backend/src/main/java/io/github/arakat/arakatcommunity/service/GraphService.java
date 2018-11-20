package io.github.arakat.arakatcommunity.service;

import com.mongodb.*;
import com.mongodb.util.JSON;
import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.exception.GraphNotFoundException;
import io.github.arakat.arakatcommunity.exception.GraphRunFailedException;
import io.github.arakat.arakatcommunity.model.TablePath;
import io.github.arakat.arakatcommunity.model.Task;
import io.github.arakat.arakatcommunity.utils.FileOperationUtils;
import io.github.arakat.arakatcommunity.utils.MongoConnectionUtils;
import io.github.arakat.arakatcommunity.utils.RequestUtils;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;

@Service
public class GraphService {

    private AppPropertyValues appPropertyValues;
    private FileOperationUtils fileOperationUtils;
    private TablePathService tablePathService;
    private TaskService taskService;
    private AppService appService;
    private MongoTemplate mongoTemplate;
    private RequestUtils requestUtils;
    private MongoConnectionUtils mongoConnectionUtils;

    @Autowired
    public GraphService(AppPropertyValues appPropertyValues, FileOperationUtils fileOperationUtils,
                        TablePathService tablePathService, TaskService taskService, AppService appService,
                        MappingMongoConverter mappingMongoConverter, MongoDbFactory mongoDbFactory,
                        RequestUtils requestUtils, MongoConnectionUtils mongoConnectionUtils) {
        this.appPropertyValues = appPropertyValues;
        this.fileOperationUtils = fileOperationUtils;
        this.tablePathService = tablePathService;
        this.taskService = taskService;
        this.appService = appService;
        this.requestUtils = requestUtils;
        this.mongoConnectionUtils = mongoConnectionUtils;
        mongoTemplate = new MongoTemplate(mongoDbFactory, mappingMongoConverter);
    }

    public JSONObject addConfigToDagProperties(String graph) {
        JSONObject graphJson = new JSONObject(graph);

        JSONObject dagProperties = (JSONObject) graphJson.get("dag_properties");

        dagProperties.put("bash_command", appPropertyValues.getBashCommand());
        graphJson.put("dag_properties", dagProperties);

        return graphJson;
    }

    public String postGraphAndDagPropsToCore(String graphToPost) {
        String uri = appPropertyValues.getArakatCoreUrl() + ":" + appPropertyValues.getArakatCorePort() + "/" + appPropertyValues.getArakatCorePostingGraphEndpoint();

        return (String) requestUtils.sendPostRequest(uri, graphToPost);
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
                    fileOperationUtils.writeToFile(key + ".py", airflowSchedulerCode, appPropertyValues.getDagOutputFileLocation());
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

                for (Object table : tables) {
                    String tablePath = new JSONObject(table.toString()).get("table_path").toString();

                    TablePath savedTablePath = tablePathService.saveAndGetTable(tablePath);
                    tablesToSave.add(savedTablePath);
                }

                Task savedTask = taskService.saveAndGetTask(task + "-" + appId, tablesToSave);
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

    public void saveGraph(String graph) {
        Document document = Document.parse(graph);
        mongoTemplate.insert(document, "graph");
//        DB db = initializeMongoConnection();
//        DBCollection graphCollection = db.getCollection("graph");
//
//        DBObject graphObject = (DBObject) JSON.parse(graph);
//
//        BasicDBObject doc = new BasicDBObject();
//        doc.put("name.first", "First Name");
//        doc.put("name.last", "Last Name");
//        graphCollection.update(new BasicDBObject("_id", "jo"), doc);
//        graphCollection.save(doc);
//        mongoTemplate.insert(doc);
    }

    public JSONObject getGraphById(String id) throws GraphNotFoundException {
        DB db = mongoConnectionUtils.initializeMongoConnection();
        DBCollection graphCollection = db.getCollection("graph");

        BasicDBObject query = new BasicDBObject();
        BasicDBObject fields = new BasicDBObject();

        query.put("_id", new ObjectId(id));
        fields.put("_id", 0);

        DBObject cursor = graphCollection.findOne(query, fields);

        if (cursor == null) {
            throw new GraphNotFoundException(id);
        }

        return new JSONObject(JSON.serialize(cursor));
    }

    private <T> Iterable<T> iteratorToIterable(Iterator<T> iterator) {
        return () -> iterator;
    }
}
