package io.github.arakat.arakatcommunity.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.model.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class JsonReaderService {

    @Value("${json.config.folder}")
    String jsonConfigFolder;

    private NodeService nodeService;
    private MongoTemplate mongoTemplate;
    private AppPropertyValues appPropertyValues;

    @Autowired
    public JsonReaderService(NodeService nodeService, MongoTemplate mongoTemplate, AppPropertyValues appPropertyValues) {
        this.nodeService = nodeService;
        this.mongoTemplate = mongoTemplate;
        this.appPropertyValues = appPropertyValues;
    }

    public void readJsonAndSaveAsNodeObject() throws Exception {
        ObjectMapper jsonMapper = new ObjectMapper();
        for (File jsonFile : getFilesInFolder(jsonConfigFolder)) {
            jsonMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            Node node = jsonMapper.readValue(jsonFile, new TypeReference<Node>() {});

            nodeService.save(node);
        }
    }

    public void readJsonAndSaveAsRawNodeObject() throws IOException {
        ObjectMapper jsonMapper = new ObjectMapper();
        for (File jsonFile : getFilesInFolder(jsonConfigFolder)) {
            Object node = jsonMapper.readValue(jsonFile, new TypeReference<Object>() {});

            mongoTemplate.insert(node, appPropertyValues.getRowNodeJsonCollectionName());
        }
    }

    private List<File> getFilesInFolder(String path) {
        List<File> results = new ArrayList<>();
        File[] files = new File(path).listFiles();

        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    results.add(file);
                }
            }
        }

        return results;
    }
}
