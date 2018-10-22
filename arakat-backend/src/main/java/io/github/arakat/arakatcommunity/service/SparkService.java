package io.github.arakat.arakatcommunity.service;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.springframework.stereotype.Service;

@Service
public class SparkService {

    public JavaRDD<String> readFileFromHDFS() {
        SparkConf sparkConf = new SparkConf().setAppName("JavaSparkIntegration").setMaster("spark://192.168.1.38:7077");
        JavaSparkContext sparkContext = new JavaSparkContext(sparkConf);

        JavaRDD<String> textFile = sparkContext.textFile("hdfs://192.168.1.38:9000/entrypoint.sh");

//        System.out.println(textFile);

        for(String line : textFile.collect()) {
            System.out.println(line);
        }

//        textFile.saveAsTextFile("hdfs://192.168.1.38:9000/");
        return textFile;
    }

}
