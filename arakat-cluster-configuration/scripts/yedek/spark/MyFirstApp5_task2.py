from pyspark import SparkContext
from pyspark.sql import SparkSession
from pyspark import SQLContext
from pyspark.sql.types import *
import pyspark.sql.functions as F
from pyspark.sql.functions import col, udf, lag, date_add, explode, lit, concat, unix_timestamp, sum, abs
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
from pyspark.ml import PipelineModel
from pyspark.ml.tuning import CrossValidatorModel

sc = SparkContext(appName="MyFirstApp5_Task_task2")
spark = SparkSession(sc)


df_node20=spark.read.format("parquet").load(path="hdfs://namenode:9000/example5/test.parquet")
model_node21=PipelineModel.load("hdfs://namenode:9000/example5/model_1/")
model_node23=CrossValidatorModel.load("hdfs://namenode:9000/example5/model_2/")
df_node22=model_node21.transform(df_node20)
df_node24=model_node23.transform(df_node22)

evaluator_node25 = MulticlassClassificationEvaluator(labelCol="indexedSurvived", predictionCol="prediction", metricName="accuracy")
score_node25=evaluator_node25.evaluate(df_node24)
df_node25= spark.createDataFrame([(score_node25,)], ["score"])

df_node25.write.format("csv").save(path="hdfs://namenode:9000/example5/EvalResult3.csv")
