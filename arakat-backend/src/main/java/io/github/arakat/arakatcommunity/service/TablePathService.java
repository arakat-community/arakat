package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.model.response.ColumnResponse;
import io.github.arakat.arakatcommunity.model.TablePath;
import io.github.arakat.arakatcommunity.repository.TablePathRepository;
import io.github.arakat.arakatcommunity.utils.RequestUtils;
import org.apache.commons.io.FilenameUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.ArrayList;
import java.util.List;

@Service
public class TablePathService {

    private IdSequenceService idSequenceService;
    private TablePathRepository tablePathRepository;
    private AppPropertyValues appPropertyValues;
    private RequestUtils requestUtils;

    @Autowired
    public TablePathService(IdSequenceService idSequenceService, TablePathRepository tablePathRepository,
                            AppPropertyValues appPropertyValues, RequestUtils requestUtils) {
        this.idSequenceService = idSequenceService;
        this.tablePathRepository = tablePathRepository;
        this.appPropertyValues = appPropertyValues;
        this.requestUtils = requestUtils;
    }

    public TablePath saveAndGetTable(String tablePath) {
        if (tablePathAlreadyExists(tablePath)) {
            return getTablePathByName(tablePath);
        }

        TablePath tableToSave = new TablePath();

        tableToSave.setTablePathId(idSequenceService.getNextSequence("TablePath"));
        tableToSave.setTablePath(tablePath);
        tablePathRepository.save(tableToSave);

        return tableToSave;
    }

    public Object getColumnsByTablePath(String tablePath) {
        String uri = appPropertyValues.getSparkHdfsHelperUrl() + ":" + appPropertyValues.getSparkHdfsHelperPort()
                + "/" + appPropertyValues.getSparkHdfsHelperGetTableColumnsEndpoint();

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("file", tablePath);

        return requestUtils.sendPostRequest(uri, map);
    }

    public List<List<ColumnResponse>> getRawData(String tablePath) {
        String uri = appPropertyValues.getSparkHdfsHelperUrl() + ":" + appPropertyValues.getSparkHdfsHelperPort()
                + "/" + appPropertyValues.getSparkHdfsHelperGetRawDataEndpoint();

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("path", tablePath);

        JSONObject response = new JSONObject(requestUtils.sendPostRequest(uri, map).toString());

        return returnColumnResponseFromRawJson(response);
    }

    public List<List<ColumnResponse>> getDataBySpecificQuery(String tablePath, String columns, String orderByColumn,
                                                       String sortBy, int limit) {
        String uri = appPropertyValues.getSparkHdfsHelperUrl() + ":" + appPropertyValues.getSparkHdfsHelperPort()
                + "/" + appPropertyValues.getSparkHdfsHelperGetDataEndpoint();

        String tableTempView = FilenameUtils.getBaseName(tablePath);
        String query = "SELECT " + columns + " FROM " + tableTempView + " ORDER BY " + orderByColumn + " " + sortBy +
                " LIMIT " + limit;

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("query", query);
        map.add("table", tableTempView);
        map.add("path", tablePath);
        map.add("selectItem", columns);
        JSONObject response = new JSONObject(requestUtils.sendPostRequest(uri, map).toString());

        return returnColumnResponseFromRawJson(response);
    }

    private List<List<ColumnResponse>> returnColumnResponseFromRawJson(JSONObject response) {

        JSONArray jsonArray = (JSONArray) response.get("data");
        List<List<ColumnResponse>> responseList = new ArrayList<>();

        for (Object o : jsonArray) {
            JSONArray columns = (JSONArray) o;
            List<ColumnResponse> columnResponseList = new ArrayList<>();
            for (Object column : columns) {
                JSONObject columnObject = (JSONObject) column;

                ColumnResponse columnResponse = new ColumnResponse(columnObject.get("column").toString(), null,
                        columnObject.get("value").toString());

                columnResponseList.add(columnResponse);
            }

            responseList.add(columnResponseList);
        }

        return responseList;
    }

    public List<ColumnResponse> getTableColumnsWithTypes(String tablePath) {
        String uri = appPropertyValues.getSparkHdfsHelperUrl() + ":" + appPropertyValues.getSparkHdfsHelperPort()
                + "/" + appPropertyValues.getSparkHdfsHelperGetTableColumnsWithTypesEndpoint();

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("file", tablePath);

        JSONArray response = new JSONArray(requestUtils.sendPostRequest(uri, map).toString());
        List<ColumnResponse> columnResponseList = new ArrayList<>();

        for (Object column : response) {
            String columnName = new JSONObject(column.toString()).get("column").toString();
            String columnType = new JSONObject(column.toString()).get("columnType").toString();

            columnResponseList.add(new ColumnResponse(columnName, columnType, null));
        }

        return columnResponseList;
    }

    public TablePath getTablePathById(Long tablePathId) {
        return tablePathRepository.findByTablePathId(tablePathId);
    }

    private boolean tablePathAlreadyExists(String tablePath) {
        return getTablePathByName(tablePath) != null;
    }

    private TablePath getTablePathByName(String tablePath) {
        return tablePathRepository.findByTablePath(tablePath);
    }
}
