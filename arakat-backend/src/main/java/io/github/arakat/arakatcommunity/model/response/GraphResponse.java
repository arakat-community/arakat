package io.github.arakat.arakatcommunity.model.response;

public class GraphResponse {

    private String appId;
    private String mongoId;

    public GraphResponse(String appId, String mongoId) {
        this.appId = appId;
        this.mongoId = mongoId;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getMongoId() {
        return mongoId;
    }

    public void setMongoId(String mongoId) {
        this.mongoId = mongoId;
    }
}
