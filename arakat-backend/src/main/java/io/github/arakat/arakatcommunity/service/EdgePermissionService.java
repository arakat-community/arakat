package io.github.arakat.arakatcommunity.service;

import com.mongodb.DBObject;
import io.github.arakat.arakatcommunity.utils.MongoConnectionUtils;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.stereotype.Service;

@Service
public class EdgePermissionService {

    private MongoTemplate mongoTemplate;
    private MongoConnectionUtils mongoConnectionUtils;

    @Autowired
    public EdgePermissionService(MongoDbFactory mongoDbFactory, MappingMongoConverter mappingMongoConverter,
                                 MongoConnectionUtils mongoConnectionUtils) {
        this.mongoTemplate = new MongoTemplate(mongoDbFactory, mappingMongoConverter);
        this.mongoConnectionUtils = mongoConnectionUtils;
    }

    public void saveEdgePermissions(String edgePermissions) {
        Document document = Document.parse(edgePermissions);
        mongoTemplate.insert(document, "edgePermissions");
    }

    public DBObject getEdgePermissions() {
        return mongoConnectionUtils.getCollectionContentAsString("edgePermissions");
    }
}
