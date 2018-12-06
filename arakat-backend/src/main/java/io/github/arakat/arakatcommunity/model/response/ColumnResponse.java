package io.github.arakat.arakatcommunity.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ColumnResponse {

    private String columnName;
    private String columnType;
    private String value;

    public ColumnResponse(String columnName, String columnType, String value) {
        this.columnName = columnName;
        this.columnType = columnType;
        this.value = value;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getColumnType() {
        return columnType;
    }

    public void setColumnType(String columnType) {
        this.columnType = columnType;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
