package io.github.arakat.arakatcommunity.model.response;

import io.github.arakat.arakatcommunity.model.App;

import java.util.List;

public class AppResponse {

    private App app;
    private List<DagStats> dagStats;

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public List<DagStats> getDagStats() {
        return dagStats;
    }

    public void setDagStats(List<DagStats> dagStats) {
        this.dagStats = dagStats;
    }
}
