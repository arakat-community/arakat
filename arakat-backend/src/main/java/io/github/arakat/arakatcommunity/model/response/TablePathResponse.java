package io.github.arakat.arakatcommunity.model.response;

import io.github.arakat.arakatcommunity.model.TablePath;

import java.util.List;

public class TablePathResponse {

    private String appId;
    private List<TablePath> tablePathList;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public List<TablePath> getTablePathList() {
        return tablePathList;
    }

    public void setTablePathList(List<TablePath> tablePathList) {
        this.tablePathList = tablePathList;
    }
}
