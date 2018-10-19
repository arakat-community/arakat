package io.github.arakat.arakatcommunity.utils;

import io.github.arakat.arakatcommunity.model.BaseResponse;
import io.github.arakat.arakatcommunity.model.Meta;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ApiResponseUtils {

    /* OPERATION MESSAGES FOR THE USER */
    private static final String USER_MESSAGE_SUCCESS = "%s operation successful.";
    private static final String USER__MESSAGE_ERROR = "An error occurred while performing %s.";
    private static final String USER__MESSAGE_SERVICE_NOT_AVAILABLE = "Server is not currently available. Please try again later.";

    /* OPERATION MESSAGES FOR THE DEVELOPER */
    private static final String DEV_MESSAGE_SUCCESS = "%s operation is successful on %s object.";
    private static final String DEV_MESSAGE_ERROR = "An error occurred while performing %s operation on %s object.";

//    private static final String FETCH_CATEGORY_BY_ID_MESSAGE_SUCCESS = "";
//    private static final String FETCH_NODES_MESSAGE_SUCCESS = "";
//    private static final String FETCH_NODE_BY_ID_MESSAGE_SUCCESS = "";
//    private static final String FETCH_RAW_NODE_BY_ID_MESSAGE_SUCCESS = "";

//    private static final String SAVE_MESSAGE_SUCCESS = "You have successfully saved %s.";
//    private static final String SAVE_MESSAGE_ERROR = "An error occured while fetching %s.";
//    private static final String SAVE_MULTIPLE_CATEGORIES_MESSAGE_SUCCESS = "";
//    private static final String SAVE_NODE_MESSAGE_SUCCESS = "";
//    private static final String DELETE_CATEGORIES_MESSAGE_SUCCESS = "";

    // TODO: Controller'larda try catch kullanarak, hata oldugunda uygun mesaji don.
    public static ResponseEntity<BaseResponse> createResponseEntity(int code, String userMessage, String devMessage,
                                                                     Object responseData, HttpStatus httpStatus) {
        Meta meta = createMeta(code, userMessage, devMessage);
        return new ResponseEntity<>(createResponse(meta, responseData), httpStatus);
    }

    public static BaseResponse createResponse(Meta meta, Object responseData) {
        BaseResponse response = new BaseResponse();

        response.setMeta(meta);
        response.setData(responseData);

        return response;
    }

    public static Meta createMeta(int code, String message, String devMessage) {
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
}
