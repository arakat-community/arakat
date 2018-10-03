package io.github.arakat.arakatcommunity.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping(value = "/hello-world", method = RequestMethod.GET)
    public String custom() {
        return "Hello World!";
    }
}
