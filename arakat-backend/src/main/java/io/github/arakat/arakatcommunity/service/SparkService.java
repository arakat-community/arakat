package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.controller.NodeController;
import io.github.arakat.arakatcommunity.exception.HdfsFileNotFoundException;
import io.github.arakat.arakatcommunity.exception.UnsupportedDataSourceException;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.MapFunction;
import org.apache.spark.sql.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.spark.sql.types.StructType;
import org.apache.commons.io.FilenameUtils;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;


@Service
public class SparkService {

    private SparkSession sparkSession;
    private SparkConf sparkConf;
    private SparkContext sparkContext;
    private JavaSparkContext javaSparkContext;
    private AppPropertyValues appPropertyValues;
    private Logger logger = LoggerFactory.getLogger(NodeController.class);

    @Autowired
    public SparkService(AppPropertyValues appPropertyValues, SparkSession sparkSession, SparkContext sparkContext,
                        JavaSparkContext javaSparkContext, SparkConf sparkConf) {
        this.appPropertyValues = appPropertyValues;
        this.sparkSession = sparkSession;
        this.sparkConf = sparkConf;
        this.sparkContext = sparkContext;
        this.javaSparkContext = javaSparkContext;
    }

    public List<String> readFileFromHDFS() {

//        SparkConf sparkConf = new SparkConf().setAppName("JavaSparkIntegration").setMaster("local[2]");
//        SparkConf sparkConf = new SparkConf().setAppName("JavaSparkIntegration").setMaster(appPropertyValues.getSparkUrl());

//        JavaSparkContext sparkContext = new JavaSparkContext(sparkConf);
//        SQLContext sqlContext = new SQLContext(sparkContext);

//        SparkSession spark = SparkSession
//                .builder()
//                .appName("Java Spark SQL basic example")
//                .config("spark.some.config.option", "some-value")
//                .getOrCreate();

        StructType schema = new StructType()
                .add("cdatetime", "string")
                .add("address", "string")
                .add("district", "string")
                .add("beat", "string")
                .add("grid", "string")
                .add("crimedescr", "string")
                .add("ucr_ncic_code", "string")
                .add("latitude", "string")
                .add("longitude", "string");

        Dataset<Row> csvData = sparkSession.read().format("csv")
                .option("mode", "DROPMALFORMED")
                .option("header", "true")
                .schema(schema)
                .csv(appPropertyValues.getHdfsUrl() + "/csv/SacramentocrimeJanuary2006.csv");

        Dataset<Row> orcData = sparkSession.read().format("org.apache.spark.sql.execution.datasources.orc")
                .load(appPropertyValues.getHdfsUrl() + "/orc/userdata1_orc");


        Dataset<Row> parquetData = sparkSession.read().parquet(appPropertyValues.getHdfsUrl() + "/parquet/userdata2.parquet");
//        parquetData.write().json();
//        return parquetData.toJSON();

//        logger.info("SHOW ORC FILE");
//        orcData.show();
//
//        logger.info("SHOW CSV FILE");
//        csvData.select("address").show();
//
//        logger.info("SHOW PARQUET FILE");
//        parquetData.show();

        parquetData.createOrReplaceTempView("userData2");
        Dataset<Row> emailsDF = sparkSession.sql("SELECT first_name, email FROM userData2 WHERE gender=\"Male\"");

        return emailsDF.map(
                (MapFunction<Row, String>) row -> "First Name: " + row.getString(0) + ", Email: " + row.getString(1),
                Encoders.STRING()).collectAsList();
    }

    public List<String> getColumnListByTablePath(String tablePath) throws UnsupportedDataSourceException {
        // TODO: change these paths in production.(according to the config for the core side.)
        String csvFolder = appPropertyValues.getHdfsUrl() + "/csv/";
        String parquetFolder = appPropertyValues.getHdfsUrl() + "/parquet/";
        String orcFolder = appPropertyValues.getHdfsUrl() + "/orc/";

//        if(!fileExists(csvFolder + tablePath)
//                && !fileExists(parquetFolder + tablePath)
//                && !fileExists(orcFolder + tablePath)) {
//            throw new HdfsFileNotFoundException(tablePath);
//        }

        Dataset<Row> dataset;

        // TODO: check these extensions with real file paths
        if(tablePath.endsWith(".parquet")) {
            dataset = sparkSession.read().parquet(parquetFolder + tablePath);
        } else if(tablePath.endsWith("orc")) {
            dataset = sparkSession.read().format("org.apache.spark.sql.execution.datasources.orc")
                    .load(orcFolder + tablePath);
        } else if(tablePath.endsWith(".csv")) {
            dataset = sparkSession.read().format("csv")
//                    .option("mode", "DROPMALFORMED")
                    .option("header", "true")
//                    .schema(schema)
                    .csv(csvFolder + tablePath);
        } else {
            throw new UnsupportedDataSourceException(FilenameUtils.getExtension(tablePath));
        }

        return Arrays.asList(dataset.columns());
    }

//    TODO: Discuss whether we need to implement ifExist method or not.
//    private boolean fileExists(String filePath) throws IOException {
//        FileSystem hdfs = org.apache.hadoop.fs.FileSystem.get(javaSparkContext.hadoopConfiguration());
//        Path path = new Path(sparkConf.get(filePath));
//
//        return hdfs.exists(path);
//    }
}
