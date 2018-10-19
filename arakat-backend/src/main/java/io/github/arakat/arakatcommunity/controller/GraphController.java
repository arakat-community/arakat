package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.model.BaseResponse;
import io.github.arakat.arakatcommunity.service.GraphService;
import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
public class GraphController {

    private GraphService graphService;

    @Autowired
    public GraphController(GraphService graphService) {
        this.graphService = graphService;
    }

    @RequestMapping(value = "/run-graph", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> runGraph(@RequestBody String graph) {

        try {
            JSONObject graphWithConfigs = graphService.addConfigToDagProperties(graph);

            // use it when the core service is not reachable
//            String dagAndTasks = graphService.mockServerResponse();

            String dagAndTasks = graphService.postGraphAndDagPropsToCore(graphWithConfigs.toString());

            graphService.separateDagAndTasks(dagAndTasks);

            return new ResponseEntity<>(graphWithConfigs.toString(), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Exception!!!", HttpStatus.NOT_FOUND);
        }
//        return new ResponseEntity<>(graphService.postGraphAndDagPropsToCore(graphWithConfigs.toString()), HttpStatus.OK);
//        return new ResponseEntity<>("deneme", HttpStatus.OK);
//        return ApiResponseUtils.createResponseEntity(200,
//                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get graph and dag properties from UI was successful."),
//                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get graph and dag properties from UI was successful", "Graph"),
//                result.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/get-dag-stats-from-airflow/{dagId}", method = RequestMethod.GET)
    public ResponseEntity<String> getDagStats(@PathVariable("dagId") String dagId) throws IOException {
//        return graphService.getDAGStatsFromAirflow();

        return new ResponseEntity<>(graphService.getDAGStatsFromAirflow(dagId).toString(), HttpStatus.OK);

//        return ApiResponseUtils.createResponseEntity(200,
//                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get DAG stats from Airflow."),
//                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get DAG stats from Airflow.", "DAG"),
//                graphService.getDAGStatsFromAirflow(), HttpStatus.OK);
    }

    @RequestMapping(value = "/get-task-stats-from-airflow/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<String> getTaskStats(@PathVariable("taskId") String taskId) throws IOException {
        return new ResponseEntity<>(graphService.getTaskStatsFromAirflow(taskId).toString(), HttpStatus.OK);
    }
}
