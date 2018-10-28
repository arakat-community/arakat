package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.model.IdSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class IdSequenceService {

    private final MongoOperations mongoOperations;

    @Autowired
    public IdSequenceService(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public long getNextSequence(String sequenceName) {
        Query query = new Query(Criteria.where("_id").is(sequenceName));

        Update update = new Update();
        update.inc("sequence", 1L);

        FindAndModifyOptions options = new FindAndModifyOptions();
        options.returnNew(true);

        mongoOperations.upsert(query, update, IdSequence.class);
        IdSequence seqId = mongoOperations.findOne(query, IdSequence.class);

        return seqId != null ? seqId.getSequence() : 1L;
    }

}
