package io.github.arakat.arakatcommunity.exception;

public class GraphRunFailedException extends Exception {

    public GraphRunFailedException() {
    }

    public GraphRunFailedException(String message) {
        super("Graph run failed! Error message is: " + message);
    }
}
