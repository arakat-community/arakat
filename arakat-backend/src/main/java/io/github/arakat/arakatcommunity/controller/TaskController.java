package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.model.Task;
import io.github.arakat.arakatcommunity.model.response.BaseResponse;
import io.github.arakat.arakatcommunity.service.TaskService;
import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @RequestMapping(value = "/get-all-tasks-by-app-id/{appId}", produces = { "application/json" }, method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getAllApps(@PathVariable String appId) {
        List<Task> tasks = taskService.getTasksByAppId(appId);

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get all tasks by appId"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get all tasks by appId", "Task"),
                tasks, HttpStatus.OK);
    }
}
