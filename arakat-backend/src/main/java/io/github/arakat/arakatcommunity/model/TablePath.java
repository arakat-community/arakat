package io.github.arakat.arakatcommunity.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "tablePath")
public class TablePath {

    @Id
    @Field("id")
    @JsonProperty("id")
    private Long tablePathId;

    @Field("tablePath")
    private String tablePath;

    public Long getTablePathId() {
        return tablePathId;
    }

    public void setTablePathId(Long tablePathId) {
        this.tablePathId = tablePathId;
    }

    public String getTablePath() {
        return tablePath;
    }

    public void setTablePath(String tablePath) {
        this.tablePath = tablePath;
    }
}
