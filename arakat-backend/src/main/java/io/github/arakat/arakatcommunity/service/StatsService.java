package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.utils.FileOperationUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatsService {

    private AppPropertyValues appPropertyValues;
    private FileOperationUtils fileOperationUtils;

    @Autowired
    public StatsService(AppPropertyValues appPropertyValues, FileOperationUtils fileOperationUtils) {
        this.appPropertyValues = appPropertyValues;
        this.fileOperationUtils = fileOperationUtils;
    }

    public JSONArray getDAGStatsFromAirflow(String dagId) throws IOException {
        String url = appPropertyValues.getAirflowUrl() + ":" + appPropertyValues.getAirflowPort() +
                appPropertyValues.getAirflowDagStatusPath();

        return getStatsById(url, dagId);
    }

    public JSONArray getTaskStatsFromAirflow(String taskId) throws IOException {
        String url = appPropertyValues.getAirflowUrl() + ":" + appPropertyValues.getAirflowPort() +
                appPropertyValues.getAirflowTaskStatusPath();

        return getStatsById(url, taskId);
    }

    private JSONArray getStatsById(String url, String id) throws IOException {
        JSONObject result = sendGetRequestAndReturnResponse(url);

        for (String key : iteratorToIterable(result != null ? result.keys() : null)) {
            if (key.equalsIgnoreCase(id)) {
                return (JSONArray) (result != null ? result.get(key) : null);
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
                    folderNamesAndFileContents.put(folderName, fileOperationUtils.readFileAsString(logFile)));
        });

        return folderNamesAndFileContents;
    }

    private JSONObject sendGetRequestAndReturnResponse(String url) throws IOException {
        URL urlForGetRequest = new URL(url);
        String readLine;

        HttpURLConnection connection = (HttpURLConnection) urlForGetRequest.openConnection();
        connection.setRequestMethod("GET");

        if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();

            while ((readLine = bufferedReader.readLine()) != null) {
                response.append(readLine);
            }

            bufferedReader.close();
            return new JSONObject(response.toString());

        } else {
            //TODO: throw an exception or something.
            System.out.println("ERROR");
            return null;
        }
    }

    private <T> Iterable<T> iteratorToIterable(Iterator<T> iterator) {
        return () -> iterator;
    }
}
