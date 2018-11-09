package io.github.arakat.arakatcommunity.utils;

import com.mongodb.*;
import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MongoConnectionUtils {

    private AppPropertyValues appPropertyValues;
    private BasicDBObject query;
    private BasicDBObject fields;

    @Autowired
    public MongoConnectionUtils(AppPropertyValues appPropertyValues) {
        this.appPropertyValues = appPropertyValues;
    }

    public DB initializeMongoConnection() {
        Mongo mongo = new Mongo(appPropertyValues.getHost(), Integer.parseInt(appPropertyValues.getPort()));
        return mongo.getDB(appPropertyValues.getDatabase());
    }

    public List<DBObject> getAllObjectsInACollection(String collectionName) {
        DBCollection collection = initializeMongoConnection().getCollection(collectionName);

        initializeBasicQuery();

        return collection.find(query, fields).toArray();
    }

    public DBObject getCollectionContentAsString(String collectionName) {
        return getAllObjectsInACollection(collectionName).get(0);
    }

    private void initializeBasicQuery() {
        query = new BasicDBObject();
        fields = new BasicDBObject();

        fields.put("_id", 0);
        fields.put("_class", 0);
    }
}
