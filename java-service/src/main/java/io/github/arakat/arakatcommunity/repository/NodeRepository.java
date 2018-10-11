package io.github.arakat.arakatcommunity.repository;

import io.github.arakat.arakatcommunity.model.Node;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NodeRepository extends MongoRepository<Node, String> {

    Node findByNodeId(int nodeId);
}
