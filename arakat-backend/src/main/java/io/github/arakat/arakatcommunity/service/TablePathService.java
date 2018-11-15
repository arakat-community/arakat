package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.model.ColumnResponse;
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

    public JSONObject getDataBySpecificQuery(String tablePath, String columns) {
        String uri = appPropertyValues.getSparkHdfsHelperUrl() + ":" + appPropertyValues.getSparkHdfsHelperPort()
                + "/" + appPropertyValues.getSparkHdfsHelperGetDataEndpoint();

        String tableTempView = FilenameUtils.getBaseName(tablePath);
        String query = "SELECT " + columns + " FROM " + tableTempView;

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("query", query);
        map.add("table", tableTempView);
        map.add("path", tablePath);
        map.add("selectItem", columns);

        Object response = requestUtils.sendPostRequest(uri, map);

        return new JSONObject(response.toString());
    }

    public List<ColumnResponse> getTableColumnsWithTypes(String tablePath) {
        String uri = appPropertyValues.getSparkHdfsHelperUrl() + ":" + appPropertyValues.getSparkHdfsHelperPort()
                + "/" + appPropertyValues.getSparkHdfsHelperGetTableColumnsWithTypesEndpoint();

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("file", tablePath);

        JSONArray response = new JSONArray(requestUtils.sendPostRequest(uri, map).toString());
        List<ColumnResponse> columnResponseList = new ArrayList<>();

        for(Object column : response) {
            String columnName = new JSONObject(column.toString()).get("column").toString();
            String columnType = new JSONObject(column.toString()).get("columnType").toString();

            columnResponseList.add(new ColumnResponse(columnName, columnType));
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
