package io.github.arakat.arakatcommunity.service;

import com.mongodb.*;
import com.mongodb.util.JSON;
import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.exception.GraphNotFoundException;
import io.github.arakat.arakatcommunity.exception.GraphRunFailedException;
import io.github.arakat.arakatcommunity.model.TablePath;
import io.github.arakat.arakatcommunity.model.Task;
import io.github.arakat.arakatcommunity.utils.FileOperationUtils;
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

    @Autowired
    public GraphService(AppPropertyValues appPropertyValues, FileOperationUtils fileOperationUtils,
                        TablePathService tablePathService, TaskService taskService, AppService appService,
                        MappingMongoConverter mappingMongoConverter, MongoDbFactory mongoDbFactory,
                        RequestUtils requestUtils) {
        this.appPropertyValues = appPropertyValues;
        this.fileOperationUtils = fileOperationUtils;
        this.tablePathService = tablePathService;
        this.taskService = taskService;
        this.appService = appService;
        this.requestUtils = requestUtils;
        mongoTemplate = new MongoTemplate(mongoDbFactory, mappingMongoConverter);
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

                for(Object table : tables) {
                    String tablePath = new JSONObject(table.toString()).get("table_path").toString();

                    TablePath savedTablePath = tablePathService.saveAndGetTable(tablePath);
//                    System.out.println(saveWrittenTableToHdfsVolume(tablePath));

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

//    private String saveWrittenTableToHdfsVolume(String tablePath) {
//        String uri = appPropertyValues.getHdfsReaderUrl() + ":" + appPropertyValues.getHdfsReaderPort()
//                + "/" + appPropertyValues.getHdfsReaderGetGraphEndpoint();
//
//        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
////        map.add("path", "hdfs://namenode:9000/example3/test.parquet");
//        map.add("path", tablePath);
//
//        return requestUtils.sendPostRequest(uri, map);
//    }

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
        DB db = initializeMongoConnection();
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

    private DB initializeMongoConnection() {
        Mongo mongo = new Mongo(appPropertyValues.getHost(), Integer.parseInt(appPropertyValues.getPort()));
        return mongo.getDB(appPropertyValues.getDatabase());
    }

    private <T> Iterable<T> iteratorToIterable(Iterator<T> iterator) {
        return () -> iterator;
    }
}
