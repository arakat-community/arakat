package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.service.GraphService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

//            String dagAndTasks = graphService.mockServerResponse(); // use it when the core service is not reachable

            String dagAndTasks = graphService.postGraphAndDagPropsToCore(graphWithConfigs.toString());

            graphService.separateDagAndTasks(dagAndTasks);

            return new ResponseEntity<>(graphWithConfigs.toString(), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Exception!!!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
