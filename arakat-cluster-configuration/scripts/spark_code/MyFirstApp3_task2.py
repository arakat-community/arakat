from pyspark import SparkContext
from pyspark.sql import SparkSession
from pyspark import SQLContext
from pyspark.sql.types import *
import pyspark.sql.functions as F
from pyspark.sql.functions import col, udf, lag, date_add, explode, lit, concat, unix_timestamp, sum, abs
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
from pyspark.ml import PipelineModel

sc = SparkContext(appName="MyFirstApp3_Task_task2")
spark = SparkSession(sc)


df_node16=spark.read.format("parquet").load(path="hdfs://namenode:9000/example3/test.parquet")
model_node17=PipelineModel.load("hdfs://namenode:9000/example3/model/")
df_node18=model_node17.transform(df_node16)

evaluator_node19 = MulticlassClassificationEvaluator(labelCol="indexedSurvived", predictionCol="prediction", metricName="accuracy")
score_node19=evaluator_node19.evaluate(df_node18)
df_node19= spark.createDataFrame([(score_node19,)], ["score"])

df_node19.write.format("csv").save(path="hdfs://namenode:9000/example3/EvalResult3.csv", quote="\"", header=True, sep=",")
