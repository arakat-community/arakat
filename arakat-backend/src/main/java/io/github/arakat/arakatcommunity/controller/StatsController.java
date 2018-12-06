package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.model.response.BaseResponse;
import io.github.arakat.arakatcommunity.service.StatsService;
import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
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

//    @RequestMapping(value = "/get-dag-stats-from-airflow/{dagId}", method = RequestMethod.GET)
//    public ResponseEntity<BaseResponse> getDagStats(@PathVariable("dagId") String dagId) throws IOException {
//        JSONArray result = statsService.getDAGStatsFromAirflow(dagId);
//
//        if(result == null) {
//            return ApiResponseUtils.createResponseEntity(404,
//                    ApiResponseUtils.getUserMessageResourceNotFound(),
//                    ApiResponseUtils.getUserMessageResourceNotFound(),
//                    null, HttpStatus.NOT_FOUND);
//        }
//
//        return ApiResponseUtils.createResponseEntity(200,
//                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get dag stats from airflow"),
//                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get dag stats from airflow", "App"),
//                result.toString(), HttpStatus.OK);
//    }

    @RequestMapping(value = "/get-dag-logs-from-airflow/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<String> getTaskStats(@PathVariable("taskId") String taskId) throws IOException {

        return new ResponseEntity<>(statsService.getTaskStatsFromAirflow(taskId).toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/get-task-logs-from-airflow/{dagId}/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<Map<String, String>> getTaskLogsFromAirflow(@PathVariable("dagId") String dagId,
                                           @PathVariable("taskId") String taskId) throws IOException {

        return new ResponseEntity<>(statsService.getDagLogsFromAirflow(dagId, taskId), HttpStatus.OK);
    }

    @RequestMapping(value = "/get-task-logs-from-spark/{appId}/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getTaskLogsFromSpark(@PathVariable("appId") String appId,
                                                             @PathVariable("taskId") String taskId) {
        try {
            String logs = statsService.getTaskLogsFromSpark(appId, taskId);

            return ApiResponseUtils.createResponseEntity(200,
                    "Get spark logs successful",
                    "Get spark logs successful",
                    logs, HttpStatus.OK);

        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
