package io.github.arakat.arakatcommunity.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties
public class AppPropertyValues {

    @Value("${spring.data.mongodb.database}")
    private String database;

    @Value("${spring.data.mongodb.host}")
    private String host;

    @Value("${spring.data.mongodb.port}")
    private String port;

    @Value("${spark.pyspark.python}")
    private String pythonVersion;

    @Value("${application.path}")
    private String applicationPath;

    @Value("${connection.id}")
    private String connectionId;

    @Value("${arakat.core.url}")
    private String arakatCoreUrl;

    @Value("${arakat.core.port}")
    private String arakatCorePort;

    @Value("${arakat.core.posting.graph.endpoint}")
    private String arakatCorePostingGraphEndpoint;

    @Value("${dag.output.file.location}")
    private String dagOutputFileLocation;

    @Value("${spark.codes.output.file.location}")
    private String sparkCodesOutputFileLocation;

    @Value("${airflow.url}")
    private String airflowUrl;

    @Value("${airflow.port}")
    private String airflowPort;

    @Value("${airflow.dag.status.path}")
    private String airflowDagStatusPath;

    @Value("${airflow.task.status.path}")
    private String airflowTaskStatusPath;

    @Value("${airflow.dag.logs.file.path}")
    private String airflowDagLogsFilePath;

    @Value("${hdfs.reader.url}")
    private String hdfsReaderUrl;

    @Value("${hdfs.reader.port}")
    private String hdfsReaderPort;;

    @Value("${hdfs.reader.get.table.columns.endpoint}")
    private String hdfsReaderGetTableColumnsEndpoint;

    @Value("${hdfs.reader.get.data.endpoint}")
    private String hdfsReaderGetDataEndpoint;

    @Value("${spark.logs.file.path}")
    private String sparkLogsFilePath;

    public String getDatabase() {
        return database;
    }

    public String getHost() {
        return host;
    }

    public String getPort() {
        return port;
    }

    public String getRowNodeJsonCollectionName() {
        return "rawJsonNodes";
    }

    public String getPythonVersion() {
        return pythonVersion;
    }

    public String getApplicationPath() {
        return applicationPath;
    }

    public String getConnectionId() {
        return connectionId;
    }

    public String getArakatCoreUrl() {
        return arakatCoreUrl;
    }

    public String getArakatCorePort() {
        return arakatCorePort;
    }

    public String getArakatCorePostingGraphEndpoint() {
        return arakatCorePostingGraphEndpoint;
    }

    public String getDagOutputFileLocation() {
        return dagOutputFileLocation;
    }

    public String getSparkCodesOutputFileLocation() {
        return sparkCodesOutputFileLocation;
    }

    public String getAirflowUrl() {
        return airflowUrl;
    }

    public String getAirflowPort() {
        return airflowPort;
    }

    public String getAirflowDagStatusPath() {
        return airflowDagStatusPath;
    }

    public String getAirflowTaskStatusPath() {
        return airflowTaskStatusPath;
    }

    public String getAirflowDagLogsFilePath() {
        return airflowDagLogsFilePath;
    }

    public String getHdfsReaderUrl() {
        return hdfsReaderUrl;
    }

    public String getHdfsReaderPort() {
        return hdfsReaderPort;
    }

    public String getHdfsReaderGetTableColumnsEndpoint() {
        return hdfsReaderGetTableColumnsEndpoint;
    }

    public String getHdfsReaderGetDataEndpoint() {
        return hdfsReaderGetDataEndpoint;
    }

    public String getSparkLogsFilePath() {
        return sparkLogsFilePath;
    }
}
