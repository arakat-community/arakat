package io.github.arakat.arakatcommunity.config;

import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.SparkSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SparkConfig {

    private final AppPropertyValues appPropertyValues;

    @Autowired
    public SparkConfig(AppPropertyValues appPropertyValues) {
        this.appPropertyValues = appPropertyValues;
    }

    @Bean
    public SparkConf sparkConf() {
        return new SparkConf()
                .setAppName("ArakatBackendSparkIntegration")
                .setMaster(appPropertyValues.getSparkMaster());
    }

    @Bean
    public SparkContext sparkContext() {
        return new SparkContext(sparkConf());
    }

    @Bean
    public JavaSparkContext javaSparkContext() {
        return new JavaSparkContext(sparkContext());
    }

    @Bean
    public SparkSession sparkSession() {
        return SparkSession
                .builder()
                .sparkContext(javaSparkContext().sc())
                .appName("Arakat Backend Spark SQL")
                .getOrCreate();
    }
}
