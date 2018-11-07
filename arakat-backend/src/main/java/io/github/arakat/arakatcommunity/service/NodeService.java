package io.github.arakat.arakatcommunity.service;

import com.mongodb.*;
import com.mongodb.client.MongoDatabase;
import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.controller.NodeController;
import io.github.arakat.arakatcommunity.model.Category;
import io.github.arakat.arakatcommunity.model.Node;
import io.github.arakat.arakatcommunity.repository.CategoryRepository;
import io.github.arakat.arakatcommunity.repository.NodeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NodeService {

    private CategoryRepository categoryRepository;
    private NodeRepository nodeRepository;
    private AppPropertyValues appPropertyValues;
    private MongoTemplate mongoTemplate;

    private Logger logger = LoggerFactory.getLogger(NodeController.class);

    @Autowired
    public NodeService(CategoryRepository categoryRepository, NodeRepository nodeRepository,
                       MongoTemplate mongoTemplate, AppPropertyValues appPropertyValues) {
        this.categoryRepository = categoryRepository;
        this.nodeRepository = nodeRepository;
        this.mongoTemplate = mongoTemplate;
        this.appPropertyValues = appPropertyValues;
    }

    public Object getRawNode(String nodeId) {
        DBCollection collection = initializeMongoConnection().getCollection(appPropertyValues.getRowNodeJsonCollectionName());

        BasicDBObject query = new BasicDBObject();
        BasicDBObject fields = new BasicDBObject();

        query.put("node_id", Integer.parseInt(nodeId));
        fields.put("_id", 0);
        fields.put("_class", 0);

        DBCursor cursor = collection.find(query, fields);

//        Query query = new Query();
//        query.addCriteria(Criteria.where("node_id").is(nodeId));
////        return mongoTemplate.findAl(query, null, "rawJsonNodes");
//        return mongoTemplate.findById()
        return cursor.toArray().size() != 0 ? cursor.toArray().get(0) : null;
    }

    public List<DBObject> getAllRawNodes() {
        DBCollection collection = initializeMongoConnection().getCollection(appPropertyValues.getRowNodeJsonCollectionName());

        BasicDBObject query = new BasicDBObject();
        BasicDBObject fields = new BasicDBObject();
        fields.put("_id", 0);
        fields.put("_class", 0);

        return collection.find(query, fields).toArray();
//        FindIterable<Document> records = initializeMongoConnection().getCollection(appPropertyValues.getRowNodeJsonCollectionName()).find();
//        MongoCursor<Document> iterator = records.iterator();

//        return records.iterator();
//        DBCursor cursor = collection.find();

//        return Collections.singletonList(cursor.toArray());
    }

//    public MongoCursor<Document> getAllRawNodes() {
//        FindIterable<Document> records = initializeMongoConnection().getCollection(appPropertyValues.getRowNodeJsonCollectionName()).find();
////        MongoCursor<Document> iterator = records.iterator();
//
//        return records.iterator();
////        DBCursor cursor = collection.find();
//
////        return Collections.singletonList(cursor.toArray());
//    }

    private DB initializeMongoConnection() {
        Mongo mongo = new Mongo(appPropertyValues.getHost(), Integer.parseInt(appPropertyValues.getPort()));
        return mongo.getDB(appPropertyValues.getDatabase());
    }

    private MongoDatabase initializeMongoConnectionDeprecated() {
        MongoClient client = new MongoClient(appPropertyValues.getHost(), Integer.parseInt(appPropertyValues.getPort()));
        return client.getDatabase(appPropertyValues.getDatabase());
//        Mongo mongo = new Mongo(appPropertyValues.getHost(), Integer.parseInt(appPropertyValues.getPort()));
//        return mongo.getData(appPropertyValues.getDatabase());
    }

    public Node save(Node node) throws Exception {
        Long categoryId = node.getCategoryId();
        List<Category> categories = categoryRepository.findAll();

        if (categories.size() == 0) {
            throw new Exception("Please add some categories first!");
        }

        Category resultCategory = searchForIndex(categories, categoryId);

        resultCategory.getNodes().add(node);
        categoryRepository.save(resultCategory);

        return nodeRepository.save(node);
    }

    private Category searchForIndex(List<Category> categories, Long categoryId) {
        Category childCategory = null;

        for(int i = 0 ; i < categories.size() && childCategory == null; i++) {
            Category category = categories.get(i);

            if(checkForCategoryId(categoryId, category.getCategoryId())) {
//                logger.info("Category ID: " + category.getCategoryId());
                return category;
            }

            childCategory = searchForIndex(category.getCategories(), categoryId);
        }

        return childCategory;
    }

    private Boolean checkForCategoryId(Long nodeCategoryId, Long originalCategoryId) {
        return nodeCategoryId.equals(originalCategoryId);
    }
}
