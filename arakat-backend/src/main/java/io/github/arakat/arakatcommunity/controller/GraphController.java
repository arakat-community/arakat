package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.exception.GraphRunFailedException;
import io.github.arakat.arakatcommunity.model.BaseResponse;
import io.github.arakat.arakatcommunity.service.GraphService;
import io.github.arakat.arakatcommunity.service.SparkService;
import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import org.apache.spark.api.java.JavaRDD;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class GraphController {

    private GraphService graphService;
    private SparkService sparkService;

    @Autowired
    public GraphController(GraphService graphService, SparkService sparkService) {
        this.graphService = graphService;
        this.sparkService = sparkService;
    }

    @SuppressWarnings("TryWithIdenticalCatches")
    @RequestMapping(value = "/run-graph", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity<BaseResponse> runGraph(@RequestBody String graph) {
        try {
            JSONObject graphWithConfigs = graphService.addConfigToDagProperties(graph);

            String responseFromCore = graphService.postGraphAndDagPropsToCore(graphWithConfigs.toString());

            List<String> writtenContent = graphService.checkRunResult(responseFromCore);

            graphService.sendGeneratedCodeToAirflow(responseFromCore);

            return ApiResponseUtils.createResponseEntity(200,
                    "Spark script is successfully generated, waiting for the airflow result.",
                    "Spark script is successfully generated, waiting for the airflow result.",
                    writtenContent, HttpStatus.OK);

        } catch (GraphRunFailedException e) {
            return ApiResponseUtils.createResponseEntity(400,
                    e.getMessage(),
                    e.getMessage(),
                    null, HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return ApiResponseUtils.createResponseEntity(400,
                    e.getMessage(),
                    e.getMessage(),
                    null, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/spark-integration", method = RequestMethod.POST)
    public JavaRDD<String> runGraph() {
        return sparkService.readFileFromHDFS();
    }
}
