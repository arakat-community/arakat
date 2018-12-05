package io.github.arakat.arakatcommunity.exception;

public class AppIdAlreadyExistsException extends Exception {

    public AppIdAlreadyExistsException(String appId) {
        super("There is already an app in the database with this app id: " + appId);
    }
}
