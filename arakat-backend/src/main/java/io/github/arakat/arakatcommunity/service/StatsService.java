package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.model.response.DagStats;
import io.github.arakat.arakatcommunity.utils.FileOperationUtils;
import io.github.arakat.arakatcommunity.utils.RequestUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatsService {

    private AppPropertyValues appPropertyValues;
    private FileOperationUtils fileOperationUtils;
    private RequestUtils requestUtils;

    @Autowired
    public StatsService(AppPropertyValues appPropertyValues, FileOperationUtils fileOperationUtils,
                        RequestUtils requestUtils) {
        this.appPropertyValues = appPropertyValues;
        this.fileOperationUtils = fileOperationUtils;
        this.requestUtils = requestUtils;
    }

    public List<DagStats> getDAGStatsFromAirflow(String dagId) throws IOException {
        String url = appPropertyValues.getAirflowUrl() + ":" + appPropertyValues.getAirflowPort() +
                appPropertyValues.getAirflowDagStatusPath();

        List<DagStats> dagStats = new ArrayList<>();
        JSONArray result = getStatsById(url, dagId);

        if (result == null) {
            return null;
        }

        for (Object o : result) {
            JSONObject stat = (JSONObject) o;
            dagStats.add(new DagStats(stat.get("color").toString(),
                    (int) stat.get("count"),
                    stat.get("state").toString(),
                    stat.get("dag_id").toString()));

        }

        return dagStats;
    }

    public JSONArray getTaskStatsFromAirflow(String taskId) throws IOException {
        String url = appPropertyValues.getAirflowUrl() + ":" + appPropertyValues.getAirflowPort() +
                appPropertyValues.getAirflowTaskStatusPath();

        return getStatsById(url, taskId);
    }

    private JSONArray getStatsById(String url, String id) throws IOException {
        JSONObject result = new JSONObject(requestUtils.sendGetRequestAndReturnResponse(url));

        for (String key : iteratorToIterable(result.keys())) {
            if (key.equalsIgnoreCase(id)) {
                return (JSONArray) result.get(key);
            }
        }

        return null;
    }

    public Map<String, String> getDagLogsFromAirflow(String dagId, String taskId) throws IOException {
        Map<String, String> folderNamesAndFiles = new HashMap<>();
        Map<String, String> folderNamesAndFileContents = new HashMap<>();

        String folderPathToRead = System.getProperty("user.dir") + appPropertyValues.getAirflowDagLogsFilePath()
                + dagId + "/" + taskId;

        List<File> timestampedFolders = Files.walk(Paths.get(folderPathToRead))
                .filter(Files::isDirectory)
                .map(Path::toFile)
                .collect(Collectors.toList());

        timestampedFolders.subList(1, timestampedFolders.size()).forEach(folder -> {
            folderNamesAndFiles.put(folder.getName(), fileOperationUtils.readFileInDirectory(folder));

            folderNamesAndFiles.forEach((folderName, logFile) ->
            {
                try {
                    folderNamesAndFileContents.put(folderName, fileOperationUtils.readFileAsString(logFile));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        });

        return folderNamesAndFileContents;
    }

    public String getTaskLogsFromSpark(String appId, String taskId) throws IOException {
        String filePath = appPropertyValues.getSparkLogsFilePath() + "log_" + appId + "_" + taskId;

        return fileOperationUtils.readFileAsString(filePath);
    }

//    public String getTaskLogsFromSpark(String appId, String taskId) throws IOException, URISyntaxException {
//        String uri = appPropertyValues.getSparkHdfsHelperUrl() + ":" + appPropertyValues.getSparkHdfsHelperPort()
//                + "/" + appPropertyValues.getSparkHdfsHelperGetSparkLogEndpoint();
//
//        return requestUtils.getSparkLogs(uri, appId + "_" + taskId);
//    }

    private <T> Iterable<T> iteratorToIterable(Iterator<T> iterator) {
        return () -> iterator;
    }
}
