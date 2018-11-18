package io.github.arakat.arakatcommunity.controller;

import com.mongodb.DBObject;
import io.github.arakat.arakatcommunity.model.response.BaseResponse;
import io.github.arakat.arakatcommunity.model.Node;
import io.github.arakat.arakatcommunity.repository.NodeRepository;
import io.github.arakat.arakatcommunity.service.NodeService;

import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<BaseResponse> saveNode(@Valid @RequestBody Node node) throws Exception {
        Node savedNode = nodeService.save(node);

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Save node"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Save node", "Node"),
                savedNode, HttpStatus.OK);
    }

    @RequestMapping(value = "/delete-nodes", produces = { "application/json" },
            method = RequestMethod.DELETE)
    public ResponseEntity<BaseResponse> deleteNodes() {
        nodeRepository.deleteAll();

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Delete all nodes"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Delete all nodes", "Node"),
                null, HttpStatus.OK);
    }

    @RequestMapping(value = "/get-nodes", produces = { "application/json" },
            method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getNodes() {
        List<Node> fetchedNodes = nodeRepository.findAll();

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get all nodes"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get all nodes", "Node"),
                fetchedNodes, HttpStatus.OK);
    }

    @RequestMapping(value = "/get-node/{nodeId}", produces = { "application/json" },
            method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getNodeById(@PathVariable("nodeId") Long nodeId) {
        Node fetchedNode = nodeRepository.findByNodeId(nodeId);

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get node by node id"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get node by node id", "Node"),
                fetchedNode, HttpStatus.OK);
    }

    @RequestMapping(value = "/get-raw-node/{nodeId}", produces = { "application/json" },
            method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getRawNodeByNodeId(@PathVariable("nodeId") String nodeId) {
        Object fetchedRawNode = nodeService.getRawNode(nodeId);

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get raw node by node id"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get raw node by node id", "Node"),
                fetchedRawNode, HttpStatus.OK);
    }

    @RequestMapping(value = "/get-raw-nodes", produces = { "application/json" },
            method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getRawNodeByNodeId() {
        List<DBObject> fetchedRawNodes = nodeService.getAllRawNodes();

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get all raw nodes"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get all raw nodes", "Node"),
                fetchedRawNodes, HttpStatus.OK);
    }
}
