package io.github.arakat.arakatcommunity.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "task")
public class Task {

    @Id
    @Field("id")
    private Long taskId;

    private String taskName;

    @DBRef
    private List<TablePath> tablePaths;

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public List<TablePath> getTablePaths() {
        return tablePaths;
    }

    public void setTablePaths(List<TablePath> tablePaths) {
        this.tablePaths = tablePaths;
    }
}
