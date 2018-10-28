package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.exception.HdfsFileNotFoundException;
import io.github.arakat.arakatcommunity.exception.UnsupportedDataSourceException;
import io.github.arakat.arakatcommunity.model.BaseResponse;
import io.github.arakat.arakatcommunity.service.TablePathService;
import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class TablePathController {

    private final TablePathService tablePathService;

    @Autowired
    public TablePathController(TablePathService tablePathService) {
        this.tablePathService = tablePathService;
    }

    @RequestMapping(value = "/get-columns-by-table-path/{tablePath}", produces = { "application/json" },
            method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getColumnsByTablePath(@PathVariable String tablePath) {
        try {
            List<String> columns = tablePathService.getColumnsByTablePath(tablePath);

            return ApiResponseUtils.createResponseEntity(200,
                    String.format(ApiResponseUtils.getUserMessageSuccess(), "Get columns by table path"),
                    String.format(ApiResponseUtils.getDevMessageSuccess(), "Get columns by table path", "TablePath"),
                    columns, HttpStatus.OK);

        } catch (UnsupportedDataSourceException e) {
            return ApiResponseUtils.createResponseEntity(400,
                    e.getMessage(),
                    e.getMessage(),
                    null, HttpStatus.BAD_REQUEST);
        }
    }
}
