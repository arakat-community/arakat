package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
public class StatsController {

    private StatsService statsService;

    @Autowired
    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @RequestMapping(value = "/get-dag-stats-from-airflow/{dagId}", method = RequestMethod.GET)
    public ResponseEntity<String> getDagStats(@PathVariable("dagId") String dagId) throws IOException {

        return new ResponseEntity<>(statsService.getDAGStatsFromAirflow(dagId).toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/get-task-logs-from-airflow/{dagId}/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<Map<String, String>> getTaskLogs(@PathVariable("dagId") String dagId,
                                           @PathVariable("taskId") String taskId) throws IOException {

        return new ResponseEntity<>(statsService.getDagLogsFromAirflow(dagId, taskId), HttpStatus.OK);
    }

    @RequestMapping(value = "/get-dag-logs-from-airflow/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<String> getTaskStats(@PathVariable("taskId") String taskId) throws IOException {

        return new ResponseEntity<>(statsService.getTaskStatsFromAirflow(taskId).toString(), HttpStatus.OK);
    }
}
