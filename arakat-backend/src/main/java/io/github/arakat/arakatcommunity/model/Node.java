package io.github.arakat.arakatcommunity.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "node")
@JsonIgnoreProperties
public class Node {

    @Id
    @JsonProperty("node_id")
    private Long nodeId;
    private String name;
    @JsonProperty("category")
    private Long categoryId;

    public Node() {}

    public Node(Long nodeId, String name, Long categoryId) {
        this.nodeId = nodeId;
        this.name = name;
        this.categoryId = categoryId;
    }

    public Long getNodeId() {
        return nodeId;
    }

    public void setNodeId(Long nodeId) {
        this.nodeId = nodeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
