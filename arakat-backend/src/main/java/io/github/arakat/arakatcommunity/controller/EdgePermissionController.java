package io.github.arakat.arakatcommunity.controller;

import com.mongodb.DBObject;
import io.github.arakat.arakatcommunity.model.response.BaseResponse;
import io.github.arakat.arakatcommunity.service.EdgePermissionService;
import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class EdgePermissionController {

    private EdgePermissionService edgePermissionService;

    @Autowired
    public EdgePermissionController(EdgePermissionService edgePermissionService) {
        this.edgePermissionService = edgePermissionService;
    }

    @RequestMapping(value = "/save-edge-permissions", method = RequestMethod.POST)
    public ResponseEntity<BaseResponse> saveEdgePermissions(@Valid @RequestBody String edgePermissions) {
        edgePermissionService.saveEdgePermissions(edgePermissions);

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Save edge permissions"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Save edge permissions", "Edge Permissions"),
                null, HttpStatus.OK);
    }

    @RequestMapping(value = "/get-edge-permissions", method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> getEdgePermissions() {
        DBObject edgePermissions = edgePermissionService.getEdgePermissions();

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get edge permissions"),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get edge permissions", "Edge Permissions"),
                edgePermissions, HttpStatus.OK);
    }
}
