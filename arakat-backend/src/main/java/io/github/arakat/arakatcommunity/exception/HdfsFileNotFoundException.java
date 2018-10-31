package io.github.arakat.arakatcommunity.exception;

public class HdfsFileNotFoundException extends Exception {

    public HdfsFileNotFoundException() {
    }

    public HdfsFileNotFoundException(String filePath) {
        super("Given file " + filePath + " could not found in HDFS!");
    }
}
