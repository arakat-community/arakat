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

    @Value("${spark.logs.file.path}")
    private String sparkLogsFilePath;

    @Value("${spark.hdfs.helper.url}")
    private String sparkHdfsHelperUrl;

    @Value("${spark.hdfs.helper.port}")
    private String sparkHdfsHelperPort;

    @Value("${spark.hdfs.helper.get.table.columns.endpoint}")
    private String sparkHdfsHelperGetTableColumnsEndpoint;

    @Value("${spark.hdfs.helper.get.table.columns.with.types.endpoint}")
    private String sparkHdfsHelperGetTableColumnsWithTypesEndpoint;

    @Value("${spark.hdfs.helper.get.data.endpoint}")
    private String sparkHdfsHelperGetDataEndpoint;

    @Value("${spark.hdfs.helper.get.raw.data.endpoint}")
    private String sparkHdfsHelperGetRawDataEndpoint;

    @Value("${spark.hdfs.helper.get.spark.log.endpoint}")
    private String sparkHdfsHelperGetSparkLogEndpoint;

    @Value("${bash.command}")
    private String bashCommand;

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

    public String getSparkLogsFilePath() {
        return sparkLogsFilePath;
    }

    public String getSparkHdfsHelperUrl() {
        return sparkHdfsHelperUrl;
    }

    public String getSparkHdfsHelperPort() {
        return sparkHdfsHelperPort;
    }

    public String getSparkHdfsHelperGetTableColumnsEndpoint() {
        return sparkHdfsHelperGetTableColumnsEndpoint;
    }

    public String getSparkHdfsHelperGetTableColumnsWithTypesEndpoint() {
        return sparkHdfsHelperGetTableColumnsWithTypesEndpoint;
    }

    public String getSparkHdfsHelperGetDataEndpoint() {
        return sparkHdfsHelperGetDataEndpoint;
    }

    public String getSparkHdfsHelperGetSparkLogEndpoint() {
        return sparkHdfsHelperGetSparkLogEndpoint;
    }

    public String getBashCommand() {
        return bashCommand;
    }

    public String getSparkHdfsHelperGetRawDataEndpoint() {
        return sparkHdfsHelperGetRawDataEndpoint;
    }
}
