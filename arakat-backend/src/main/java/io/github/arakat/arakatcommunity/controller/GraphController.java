package io.github.arakat.arakatcommunity.controller;

import com.mongodb.DBObject;
import io.github.arakat.arakatcommunity.exception.AppIdAlreadyExistsException;
import io.github.arakat.arakatcommunity.exception.GraphNotFoundException;
import io.github.arakat.arakatcommunity.exception.GraphRunFailedException;
import io.github.arakat.arakatcommunity.model.response.BaseResponse;
import io.github.arakat.arakatcommunity.model.response.GraphResponse;
import io.github.arakat.arakatcommunity.service.GraphService;
import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class GraphController {

    private GraphService graphService;
    private Logger logger = LoggerFactory.getLogger(NodeController.class);

    @Autowired
    public GraphController(GraphService graphService) {
        this.graphService = graphService;
    }

    @RequestMapping(value = "/run-graph", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity<BaseResponse> runGraph(@RequestBody String graph) {
        try {
            logger.info("++++++++++++++++RAW-GRAPH++++++++++++++");
            logger.info(graph);

            JSONObject graphWithConfigs = graphService.addConfigToDagProperties(graph);

            logger.info("++++++++++++++++GRAPH-WITH-CONFIGS++++++++++++++");
            logger.info(graphWithConfigs.toString());

            String responseFromCore = graphService.postGraphAndDagPropsToCore(graphWithConfigs.toString());

            logger.info("++++++++++++++++GENERATED-CODE++++++++++++++");
            logger.info(responseFromCore);
            graphService.checkRunResult(responseFromCore);
            graphService.saveGraph(graph);
            graphService.saveWrittenTablesToDatabase(responseFromCore);
            graphService.sendGeneratedCodeToAirflow(responseFromCore);

            return ApiResponseUtils.createResponseEntity(200,
                    "Spark and Airflow scripts are successfully generated, you can check the results from the ResultsView page.",
                    "Spark and Airflow scripts are successfully generated, you can check the results from the ResultsView page.",
                    null, HttpStatus.OK);

        } catch (GraphRunFailedException e) {
            return ApiResponseUtils.createResponseEntity(400,
                    e.getMessage(),
                    e.getMessage(),
                    null, HttpStatus.BAD_REQUEST);
        } catch (AppIdAlreadyExistsException e) {
            return ApiResponseUtils.createResponseEntity(400,
                    e.getMessage(),
                    e.getMessage(),
                    null, HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return ApiResponseUtils.createResponseEntity(500,
                    e.getMessage(),
                    e.getMessage(),
                    null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/load-graph/{graphId}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<BaseResponse> loadGraphById(@PathVariable String graphId) {
        try {
            DBObject returnedGraph = graphService.loadGraph(graphId);
            DBObject graphWithConfigs = graphService.addConfigToDagPropertiesDBObject(returnedGraph);

            return ApiResponseUtils.createResponseEntity(200,
                    "Get graph by id",
                    "Get graph by id",
                    graphWithConfigs, HttpStatus.OK);
        } catch (GraphNotFoundException e) {
            return ApiResponseUtils.createResponseEntity(404,
                    e.getMessage(),
                    e.getMessage(),
                    null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/save-temp-graph", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity<BaseResponse> saveGraph(@RequestBody String graph) {
        try {
            graphService.saveGraph(graph);

            return ApiResponseUtils.createResponseEntity(200,
                    "Save graph",
                    "Save graph",
                    null, HttpStatus.OK);
        } catch (Exception e) {
            return ApiResponseUtils.createResponseEntity(404,
                    e.getMessage(),
                    e.getMessage(),
                    null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/get-graphs", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<BaseResponse> getGraphs() {
        try {
            List<GraphResponse> returnedGraph = graphService.getAllGraphs();

            return ApiResponseUtils.createResponseEntity(200,
                    "Get all graphs",
                    "Get all graphs",
                    returnedGraph, HttpStatus.OK);
        } catch (GraphNotFoundException e) {
            return ApiResponseUtils.createResponseEntity(404,
                    e.getMessage(),
                    e.getMessage(),
                    null, HttpStatus.NOT_FOUND);
        }
    }

}
