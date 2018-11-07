from pyspark import SparkContext
from pyspark.sql import SparkSession
from pyspark import SQLContext
from pyspark.sql.types import *
import pyspark.sql.functions as F
from pyspark.sql.functions import col, udf, lag, date_add, explode, lit, concat, unix_timestamp, sum, abs
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
from pyspark.ml.feature import OneHotEncoder
from pyspark.ml.tuning import CrossValidator
from pyspark.ml.feature import StringIndexer
from pyspark.ml.tuning import ParamGridBuilder
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml import Pipeline

sc = SparkContext(appName="MyFirstApp4_Task_task1")
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

df_node3=df_node2.randomSplit(seed=1234, weights=[0.6, 0.2, 0.2])

df_node3[2].write.format("parquet").save(path="hdfs://namenode:9000/example4/test.parquet")

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

stages_node7=[stages_node4, stages_node5, pipeline_stage_node6]
stages_node7 = [i for i in flatten(stages_node7)]
pipeline_node7=Pipeline(stages=stages_node7)
model_node7=pipeline_node7.fit(df_node3[0])
df_node7=model_node7.transform(df_node3[0])

estimator_node9 = RandomForestClassifier(featureSubsetStrategy="auto", numTrees=20, maxDepth=5, predictionCol="prediction", rawPredictionCol="rawPrediction", probabilityCol="probability", labelCol="indexedSurvived", featuresCol="features", impurity="gini")
evaluator_node10 = MulticlassClassificationEvaluator(labelCol="indexedSurvived", predictionCol="prediction", metricName="accuracy")
param_grid_node11=ParamGridBuilder().addGrid(estimator_node9.maxDepth, [3, 5, 8, 20]).build()
cv_node11=CrossValidator(estimator=estimator_node9, estimatorParamMaps=param_grid_node11, evaluator=evaluator_node10)
model_node11=cv_node11.fit(df_node7)
df_node11=model_node11.transform(df_node7)
model_node7.save("hdfs://namenode:9000/example4/model_1/")
df_node13=model_node7.transform(df_node3[1])
model_node11.save("hdfs://namenode:9000/example4/model_2/")
df_node14=model_node11.transform(df_node13)

evaluator_node15 = MulticlassClassificationEvaluator(labelCol="indexedSurvived", predictionCol="prediction", metricName="accuracy")
score_node15=evaluator_node15.evaluate(df_node14)
df_node15= spark.createDataFrame([(score_node15,)], ["score"])

df_node15.write.format("parquet").save(path="hdfs://namenode:9000/example4/EvalResult2.parquet")
