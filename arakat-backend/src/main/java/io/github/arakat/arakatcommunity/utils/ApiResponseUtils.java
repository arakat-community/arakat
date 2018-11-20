package io.github.arakat.arakatcommunity.utils;

import io.github.arakat.arakatcommunity.model.response.BaseResponse;
import io.github.arakat.arakatcommunity.model.response.Meta;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ApiResponseUtils {

    /* OPERATION MESSAGES FOR THE USER */
    private static final String USER_MESSAGE_SUCCESS = "%s operation successful.";
    private static final String USER__MESSAGE_ERROR = "Error! %s while performing %s.";
    private static final String USER__MESSAGE_SERVICE_NOT_AVAILABLE = "Server is not currently available. Please try again later.";
    private static final String USER__MESSAGE_RESOURCE_NOT_FOUND = "Given resource could not found!";

    /* OPERATION MESSAGES FOR THE DEVELOPER */
    private static final String DEV_MESSAGE_SUCCESS = "%s operation is successful on %s object.";
    private static final String DEV_MESSAGE_ERROR = "Error! %s while performing %s on %s object.";

    public static ResponseEntity<BaseResponse> createResponseEntity(int code, String userMessage, String devMessage,
                                                                     Object responseData, HttpStatus httpStatus) {
        Meta meta = createMeta(code, userMessage, devMessage);
        return new ResponseEntity<>(createResponse(meta, responseData), httpStatus);
    }

    private static BaseResponse createResponse(Meta meta, Object responseData) {
        BaseResponse response = new BaseResponse();

        response.setMeta(meta);
        response.setData(responseData);

        return response;
    }

    private static Meta createMeta(int code, String message, String devMessage) {
        Meta meta = new Meta();

        meta.setCode(code);
        meta.setMessage(message);
        meta.setDevMessage(devMessage);

        return meta;
    }

    public static String getUserMessageSuccess() {
        return USER_MESSAGE_SUCCESS;
    }

    public static String getUserMessageError() {
        return USER__MESSAGE_ERROR;
    }

    public static String getUserMessageServiceNotAvailable() {
        return USER__MESSAGE_SERVICE_NOT_AVAILABLE;
    }

    public static String getDevMessageSuccess() {
        return DEV_MESSAGE_SUCCESS;
    }

    public static String getDevMessageError() {
        return DEV_MESSAGE_ERROR;
    }

    public static String getUserMessageResourceNotFound() {
        return USER__MESSAGE_RESOURCE_NOT_FOUND;
    }
}
