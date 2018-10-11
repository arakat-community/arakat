package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.service.JSONReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
public class JSONController {

    private JSONReaderService jsonReaderService;

    @Autowired
    public JSONController(JSONReaderService jsonReaderService) {
        this.jsonReaderService = jsonReaderService;
    }

    @RequestMapping(value = "/save-json-objects", method = RequestMethod.GET)
    public void saveJSONObject() throws IOException {
        jsonReaderService.readJson();
    }
}
