package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.model.response.BaseResponse;
import io.github.arakat.arakatcommunity.model.response.ColumnResponse;
import io.github.arakat.arakatcommunity.model.Task;
import io.github.arakat.arakatcommunity.repository.TaskRepository;
import io.github.arakat.arakatcommunity.service.TablePathService;
import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import io.github.arakat.arakatcommunity.utils.RequestUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TablePathController {

    private final TablePathService tablePathService;
    private final TaskRepository taskRepository;
    private final RequestUtils requestUtils;

    @Autowired
    public TablePathController(TablePathService tablePathService, TaskRepository taskRepository, RequestUtils requestUtils) {
        this.tablePathService = tablePathService;
        this.taskRepository = taskRepository;
        this.requestUtils = requestUtils;
    }

    @RequestMapping(value = "/get-columns-by-table-path/{tablePath}", produces = { "application/json" },
            method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getColumnsByTablePath(@PathVariable String tablePath) {
        List<ColumnResponse> columns = tablePathService.getTableColumnsWithTypes(requestUtils.reformatUrl(tablePath));

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get columns by table path"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get columns by table path", "TablePath"),
                columns, HttpStatus.OK);
    }

    @RequestMapping(value = "/get-table-paths-by-taskId/{taskId}", produces = {"application/json"},
            method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getTablePathsByTaskId(@PathVariable Long taskId) {
        Task resultTask = taskRepository.findByTaskId(taskId);

        if(resultTask == null) {
            return ApiResponseUtils.createResponseEntity(404,
                    String.format(ApiResponseUtils.getUserMessageError(), "Could not found any task with given task id", "Get table paths by task id"),
                    String.format(ApiResponseUtils.getDevMessageError(), "Could not found any task with given task id", "Get table paths by task id", "TablePath"),
                    null, HttpStatus.NOT_FOUND);
        }

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get table paths by task id"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get table paths by task id", "TablePath"),
                resultTask.getTablePaths(), HttpStatus.OK);
    }

    @RequestMapping(value = "/get-data/{tablePath}/{columns}", produces = {"application/json"},
            method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getData(@PathVariable String tablePath, @PathVariable String columns) {
        List<ColumnResponse> data = tablePathService.getDataBySpecificQuery(requestUtils.reformatUrl(tablePath), columns);

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get table paths by task id"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get table paths by task id", "TablePath"),
                data, HttpStatus.OK);
    }
}
