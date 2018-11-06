package io.github.arakat.arakatcommunity.utils;

import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class RequestUtils {

    public Object sendPostRequest(String uri, Object requestBody) {
        RestTemplate restTemplate = new RestTemplate();

        restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
        restTemplate.getMessageConverters().add(new StringHttpMessageConverter());

        Map<String, String> vars = new HashMap<>();

        return restTemplate.postForObject(uri, requestBody, String.class, vars);
    }

    public String reformatUrl(String url) {
        return url.replace("%3A", ":").replace("%2F", "/");
    }
}
