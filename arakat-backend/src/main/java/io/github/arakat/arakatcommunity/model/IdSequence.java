package io.github.arakat.arakatcommunity.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "idSequence")
public class IdSequence {

    @Id
    private String id;

    private Long sequence;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getSequence() {
        return sequence;
    }

    public void setSeqeunce(Long seqeunce) {
        this.sequence = seqeunce;
    }
}
