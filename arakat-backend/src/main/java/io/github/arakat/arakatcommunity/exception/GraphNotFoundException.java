package io.github.arakat.arakatcommunity.exception;

public class GraphNotFoundException extends Exception {

    public GraphNotFoundException(String graphId) {
        super("There is no such graph with given id: " + graphId);
    }
}
