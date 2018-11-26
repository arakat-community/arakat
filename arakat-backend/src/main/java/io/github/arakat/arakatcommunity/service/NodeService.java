package io.github.arakat.arakatcommunity.service;

import com.mongodb.*;
import com.mongodb.client.MongoDatabase;
import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.controller.NodeController;
import io.github.arakat.arakatcommunity.model.Category;
import io.github.arakat.arakatcommunity.model.Node;
import io.github.arakat.arakatcommunity.repository.CategoryRepository;
import io.github.arakat.arakatcommunity.repository.NodeRepository;
import io.github.arakat.arakatcommunity.utils.MongoConnectionUtils;
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
    private MongoConnectionUtils mongoConnectionUtils;

    private Logger logger = LoggerFactory.getLogger(NodeController.class);

    @Autowired
    public NodeService(CategoryRepository categoryRepository, NodeRepository nodeRepository,
                       AppPropertyValues appPropertyValues,
                       MongoConnectionUtils mongoConnectionUtils) {
        this.categoryRepository = categoryRepository;
        this.nodeRepository = nodeRepository;
        this.appPropertyValues = appPropertyValues;
        this.mongoConnectionUtils = mongoConnectionUtils;
    }

    public Object getRawNode(String nodeId) {
        DBCollection collection = mongoConnectionUtils.initializeMongoConnection()
                .getCollection(appPropertyValues.getRowNodeJsonCollectionName());

        BasicDBObject query = new BasicDBObject();
        BasicDBObject fields = new BasicDBObject();

        query.put("node_id", Integer.parseInt(nodeId));
        fields.put("_id", 0);
        fields.put("_class", 0);

        DBCursor cursor = collection.find(query, fields);

        return cursor.toArray().size() != 0 ? cursor.toArray().get(0) : null;
    }

    public List<DBObject> getAllRawNodes() {
        return mongoConnectionUtils.getAllObjectsInACollection(appPropertyValues.getRowNodeJsonCollectionName());
    }

    private MongoDatabase initializeMongoConnectionDeprecated() {
        MongoClient client = new MongoClient(appPropertyValues.getHost(), Integer.parseInt(appPropertyValues.getPort()));
        return client.getDatabase(appPropertyValues.getDatabase());
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

        for (int i = 0 ; i < categories.size() && childCategory == null; i++) {
            Category category = categories.get(i);

            if (checkForCategoryId(categoryId, category.getCategoryId())) {
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
