package io.github.arakat.arakatcommunity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"io.github.arakat.arakatcommunity.*"})
@EntityScan("io.github.arakat.arakatcommunity.model")
@EnableMongoRepositories("io.github.arakat.arakatcommunity.*")
public class ArakatApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArakatApplication.class, args);

//		String action = args[0];
//		int rowCount = Integer.parseInt(args[1]);
//		boolean isTruncated = Boolean.parseBoolean(args[2]);

//		SparkSession sparkSession = sparkSession();
////		SparkContext sparkContext = sparkContext();
//		Dataset<Row> dataset = sparkSession.read().format("csv")
//		.option("header", "true")
//		.csv("hdfs://namenode:9000/deneme.csv");
////		sparkSession.read().parquet("file:///deneme.csv");
////		parquetData.createOrReplaceTempView("parquet-data");
////
////		Dataset<Row> resultDF = sparkSession.sql("SELECT * FROM userData2 LIMIT " + rowCount);
////
////		if (action.equalsIgnoreCase("show")) {
////			resultDF.show(isTruncated);
////		}
	}

//	private static SparkSession sparkSession() {
//		return SparkSession
//				.builder()
//				.sparkContext(javaSparkContext().sc())
//				.appName("Arakat Backend Spark SQL")
//				.getOrCreate();
//	}
//
//	private static JavaSparkContext javaSparkContext() {
//		return new JavaSparkContext(sparkContext());
//	}
//
//	private static SparkContext sparkContext() {
//		return new SparkContext(sparkConf());
//	}
//
//	private static SparkConf sparkConf() {
//		return new SparkConf()
//				.setAppName("ArakatBackendSpark")
////				.setMaster(appPropertyValues.getSparkMaster());
//				.setMaster("spark://spark-master:7077");
//	}
}