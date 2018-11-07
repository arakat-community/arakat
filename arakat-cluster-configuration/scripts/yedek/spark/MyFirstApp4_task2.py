from pyspark import SparkContext
from pyspark.sql import SparkSession
from pyspark import SQLContext
from pyspark.sql.types import *
import pyspark.sql.functions as F
from pyspark.sql.functions import col, udf, lag, date_add, explode, lit, concat, unix_timestamp, sum, abs
from pyspark.ml.tuning import CrossValidatorModel
from pyspark.ml import PipelineModel
from pyspark.ml.evaluation import MulticlassClassificationEvaluator

sc = SparkContext(appName="MyFirstApp4_Task_task2")
spark = SparkSession(sc)


df_node18=spark.read.format("parquet").load(path="hdfs://namenode:9000/example4/test.parquet")
model_node21=CrossValidatorModel.load("hdfs://namenode:9000/example4/model_2/")
model_node19=PipelineModel.load("hdfs://namenode:9000/example4/model_1/")
df_node20=model_node19.transform(df_node18)
df_node22=model_node21.transform(df_node20)

evaluator_node23 = MulticlassClassificationEvaluator(labelCol="indexedSurvived", predictionCol="prediction", metricName="accuracy")
score_node23=evaluator_node23.evaluate(df_node22)
df_node23= spark.createDataFrame([(score_node23,)], ["score"])

df_node23.write.format("csv").save(path="hdfs://namenode:9000/example4/EvalResult3.csv")
