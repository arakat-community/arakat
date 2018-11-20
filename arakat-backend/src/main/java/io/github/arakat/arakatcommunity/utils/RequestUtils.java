package io.github.arakat.arakatcommunity.utils;

import org.apache.http.client.utils.URIBuilder;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URISyntaxException;
import java.net.URL;
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

    public String getSparkLogs(String url, String param) throws IOException, URISyntaxException {
        URIBuilder builder = new URIBuilder(url);
        builder.setParameter("sparkTask", param);

        return sendGetRequestAndReturnResponse(builder.toString());
    }

    public String sendGetRequestAndReturnResponse(String url) throws IOException {
        URL urlForGetRequest = new URL(url);
        String readLine;

        HttpURLConnection connection = (HttpURLConnection) urlForGetRequest.openConnection();
        connection.setRequestMethod("GET");

        if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();

            while ((readLine = bufferedReader.readLine()) != null) {
                response.append(readLine);
            }

            bufferedReader.close();

            return response.toString();
        } else {
            System.out.println("ERROR");
            return null;
        }
    }
}
