from pyspark import SparkContext
from pyspark.sql import SparkSession
from pyspark import SQLContext
from pyspark.sql.types import *
import pyspark.sql.functions as F
from pyspark.sql.functions import col, udf, lag, date_add, explode, lit, concat, unix_timestamp, sum, abs
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
from pyspark.ml.feature import OneHotEncoder
from pyspark.ml.feature import StringIndexer
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml import Pipeline

sc = SparkContext(appName="MyFirstApp2_Task_task1")
spark = SparkSession(sc)
import collections
def flatten(l):
	for el in l:
		if isinstance(el, collections.Iterable) and not isinstance(el, basestring):
			for sub in flatten(el):
				yield sub
		else:
			yield el



df_node1=spark.read.format("csv").load(path="file:///usr/local/spark_code/train.csv", quote="\"", sep=",", inferSchema=True, header=True)

df_node2=df_node1.dropna(subset=["PassengerId", "Survived", "Pclass", "Name", "Sex", "Age", "SibSp", "Parch", "Ticket", "Fare", "Cabin", "Embarked"], how="any", thresh=12)

df_node3=df_node2.randomSplit(seed=1234, weights=[0.7, 0.3])

mmi_value_0_node4 = ["Sex", "Embarked", "Survived"]
mmi_value_1_node4 = ["indexedSex", "indexedEmbarked", "indexedSurvived"]
stages_node4 = []
for i in range(len(mmi_value_0_node4)):
	stages_node4.append(StringIndexer(inputCol=mmi_value_0_node4[i], outputCol=mmi_value_1_node4[i], handleInvalid="error", stringOrderType="frequencyDesc"))

mmi_value_0_node5 = ["indexedSex", "indexedEmbarked"]
mmi_value_1_node5 = ['sexVec', 'embarkedVec']
stages_node5 = []
for i in range(len(mmi_value_0_node5)):
	stages_node5.append(OneHotEncoder(inputCol=mmi_value_0_node5[i], outputCol=mmi_value_1_node5[i]))

pipeline_stage_node6 = VectorAssembler(outputCol="features", inputCols=["Pclass", "sexVec", "Age", "SibSp", "Fare", "embarkedVec"])
pipeline_stage_node7 = RandomForestClassifier(featureSubsetStrategy="auto", numTrees=20, maxDepth=5, predictionCol="prediction", rawPredictionCol="rawPrediction", probabilityCol="probability", labelCol="indexedSurvived", featuresCol="features", impurity="gini")

stages_node8=[stages_node4, stages_node5, pipeline_stage_node6, pipeline_stage_node7]
stages_node8 = [i for i in flatten(stages_node8)]
pipeline_node8=Pipeline(stages=stages_node8)
model_node8=pipeline_node8.fit(df_node3[0])
df_node8=model_node8.transform(df_node3[0])
df_node11=model_node8.transform(df_node3[1])
model_node8.save("hdfs://namenode:9000/example2/model/")

evaluator_node9 = MulticlassClassificationEvaluator(labelCol="indexedSurvived", predictionCol="prediction", metricName="accuracy")
score_node9=evaluator_node9.evaluate(df_node8)
df_node9= spark.createDataFrame([(score_node9,)], ["score"])

evaluator_node12 = MulticlassClassificationEvaluator(labelCol="indexedSurvived", predictionCol="prediction", metricName="accuracy")
score_node12=evaluator_node12.evaluate(df_node11)
df_node12= spark.createDataFrame([(score_node12,)], ["score"])

df_node9.write.format("parquet").save(path="hdfs://namenode:9000/example2/EvalResult1.parquet")

df_node12.write.format("parquet").save(path="hdfs://namenode:9000/example2/EvalResult2.parquet")
