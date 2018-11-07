package io.github.arakat.arakatcommunity.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;

import javax.annotation.PostConstruct;

@Configuration
public class MongoConfig {

    private final MappingMongoConverter mongoConverter;

    @Autowired
    public MongoConfig(MappingMongoConverter mongoConverter) {
        this.mongoConverter = mongoConverter;
    }

    @PostConstruct
    public void mappingMongoConverter() {
        mongoConverter.setMapKeyDotReplacement("_");
        mongoConverter.afterPropertiesSet();
    }
}
