package io.github.arakat.arakatcommunity.repository;

import io.github.arakat.arakatcommunity.model.App;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppRepository extends MongoRepository<App, Long> {

    void deleteAppByAppId(String appId);
    App findByAppId(String appId);
}
