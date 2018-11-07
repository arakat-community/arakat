package io.github.arakat.arakatcommunity.repository;

import io.github.arakat.arakatcommunity.model.TablePath;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TablePathRepository extends MongoRepository<TablePath, Long> {

    TablePath findByTablePath(String tablePath);
    TablePath findByTablePathId(Long tablePathId);
}
