from pyspark import SparkContext
from pyspark.sql import SparkSession
from pyspark import SQLContext
from pyspark.sql.types import *
import pyspark.sql.functions as F
from pyspark.sql.functions import col, udf, lag, date_add, explode, lit, concat, unix_timestamp, sum, abs

sc = SparkContext(appName="MyFirstApp_Task_task1")
spark = SparkSession(sc)


df_node1=spark.read.format("csv").load(path="file:///usr/local/spark_code/train.csv", quote="\"", sep=",", inferSchema=True, header=True)

df_node1.write.format("parquet").save(path="hdfs://namenode:9000/example1/")
