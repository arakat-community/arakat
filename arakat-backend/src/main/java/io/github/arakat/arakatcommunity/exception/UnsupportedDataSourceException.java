package io.github.arakat.arakatcommunity.exception;

public class UnsupportedDataSourceException extends Exception {

    public UnsupportedDataSourceException() {
    }

    public UnsupportedDataSourceException(String dataSourceFormat) {
        super("Data source in format " + dataSourceFormat + " is not supported!");
    }
}
