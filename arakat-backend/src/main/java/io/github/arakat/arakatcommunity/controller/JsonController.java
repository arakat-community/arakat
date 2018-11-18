package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.model.response.BaseResponse;
import io.github.arakat.arakatcommunity.service.JsonReaderService;
import io.github.arakat.arakatcommunity.utils.ApiResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class JsonController {

    private JsonReaderService jsonReaderService;

    @Autowired
    public JsonController(JsonReaderService jsonReaderService) {
        this.jsonReaderService = jsonReaderService;
    }

    @RequestMapping(value = "/save-json-objects-from-file", method = RequestMethod.POST)
    public ResponseEntity<BaseResponse> saveJSONObjects() {
        try {
            jsonReaderService.readJsonAndSaveAsNodeObject();

            return ApiResponseUtils.createResponseEntity(200,
                    String.format(ApiResponseUtils.getUserMessageSuccess(), "Save JSON node objects from file."),
                    String.format(ApiResponseUtils.getDevMessageSuccess(), "Save JSON node objects from file", "JSON file node"),
                    null, HttpStatus.OK);
        } catch (Exception e) {
            return ApiResponseUtils.createResponseEntity(400,
                    e.getMessage(),
                    e.getMessage(),
                    null, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/save-json-raw-objects-from-file", method = RequestMethod.POST)
    public ResponseEntity<BaseResponse> saveRawJSONObjects() throws IOException {
        jsonReaderService.readJsonAndSaveAsRawNodeObject();

        return ApiResponseUtils.createResponseEntity(200,
                String.format(ApiResponseUtils.getUserMessageSuccess(), "Save raw JSON node objects from file."),
                String.format(ApiResponseUtils.getDevMessageSuccess(), "Save raw JSON node objects from file", "raw JSON file node"),
                null, HttpStatus.OK);
    }
}
