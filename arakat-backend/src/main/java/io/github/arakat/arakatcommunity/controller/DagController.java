package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.model.BaseResponse;
import io.github.arakat.arakatcommunity.service.DAGService;
import io.github.arakat.arakatcommunity.service.JSONModifier;
import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.Valid;

@RestController
public class DagController {

    private Logger logger = LoggerFactory.getLogger(NodeController.class);
    private DAGService dagService;
    private JSONModifier jsonModifier;

    @Autowired
    public DagController(DAGService dagService, JSONModifier jsonModifier) {
        this.dagService = dagService;
        this.jsonModifier = jsonModifier;
    }

//    @RequestMapping(value = "/get-dag-id-from-dag", method = RequestMethod.POST)
//    public ResponseEntity<BaseResponse> getDagIdFromResult(@Valid @RequestBody String result) {
//
//        return ApiResponseUtils.createResponseEntity(200,
//                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get dag id from given dag"),
//                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get dag id from given dag", "DAG"),
//                dagService.getDagId(result), HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/get-task-list-from-result", method = RequestMethod.POST)
//    public ResponseEntity<BaseResponse> getTaskListFromResult(@Valid @RequestBody String result) {
//
//        return ApiResponseUtils.createResponseEntity(200,
//                String.format(ApiResponseUtils.getUserMessageSuccess(), "Get list of task ids from given dag"),
//                String.format(ApiResponseUtils.getDevMessageSuccess(), "Get list of task ids from given dag", "DAG"),
//                dagService.getListOfTaskIds(result), HttpStatus.OK);
//    }

//    @RequestMapping(value = "/save-dag", method = RequestMethod.POST)
//    public ResponseEntity<BaseResponse> saveDag(@Valid @RequestBody String result) {
//
//        return null;
////        return ApiResponseUtils.createResponseEntity(200,
////                String.format(ApiResponseUtils.getUserMessageSuccess(), "Save dag"),
////                String.format(ApiResponseUtils.getDevMessageSuccess(), "Save dag", "DAG"),
////                dagService.getListOfTaskIds(result), HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/save-dag", method = RequestMethod.POST)
//    public ResponseEntity<BaseResponse> runServer(@Valid @RequestBody String result) {
//
//        return null;
////        return ApiResponseUtils.createResponseEntity(200,
////                String.format(ApiResponseUtils.getUserMessageSuccess(), "Save dag"),
////                String.format(ApiResponseUtils.getDevMessageSuccess(), "Save dag", "DAG"),
////                dagService.getListOfTaskIds(result), HttpStatus.OK);
//    }

    @RequestMapping(value = "/modify-json", method = RequestMethod.GET)
    public ResponseEntity<BaseResponse> modifyJSON() {

        jsonModifier.modifyJson();
//        return null;
//        return ApiResponseUtils.createResponseEntity(200,
//                String.format(ApiResponseUtils.getUserMessageSuccess(), "Save dag"),
//                String.format(ApiResponseUtils.getDevMessageSuccess(), "Save dag", "DAG"),
//                dagService.getListOfTaskIds(result), HttpStatus.OK);
        return null;
    }

//    @RequestMapping(value = "/get-dag-id", method = RequestMethod.GET)
//    public String getDagId() {
//
//
//    }
//
//    @RequestMapping(value = "/save-dag", method = RequestMethod.POST)
//    public String getDagId(@Valid @RequestBody Object dag) {
//
//
//    }
//
//    @RequestMapping(value = "/get-task-id", method = RequestMethod.POST)
//    public String getDagId(@Valid @RequestBody Object dag) {
//
//
//    }
}
