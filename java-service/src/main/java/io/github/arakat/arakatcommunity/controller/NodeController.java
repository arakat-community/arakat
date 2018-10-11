package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.model.Node;
import io.github.arakat.arakatcommunity.repository.NodeRepository;
import io.github.arakat.arakatcommunity.service.NodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
public class NodeController {


    private NodeRepository nodeRepository;
    private NodeService nodeService;

    @Autowired
    public NodeController(NodeRepository nodeRepository, NodeService nodeService) {
        this.nodeRepository = nodeRepository;
        this.nodeService = nodeService;
    }

    @RequestMapping(value = "/save-node", method = RequestMethod.POST)
    public void saveNode(@Valid @RequestBody Node node) {
        nodeService.save(node);
    }

    @RequestMapping(value = "/delete-nodes", produces = { "application/json" },
            method = RequestMethod.DELETE)
    public void deleteNodes() {
        nodeRepository.deleteAll();
    }

    @RequestMapping(value = "/get-nodes", produces = { "application/json" },
            method = RequestMethod.GET)
    public List<Node> getNodes() {
        return nodeRepository.findAll();
    }

    @RequestMapping(value = "/get-node/{nodeId}", produces = { "application/json" },
            method = RequestMethod.GET)
    public Node getNodeById(@PathVariable("nodeId") int nodeId) {
        return nodeRepository.findByNodeId(nodeId);
    }
}
