from pyspark import SparkContext
from pyspark.sql import SparkSession
from pyspark import SQLContext
from pyspark.sql.types import *
import pyspark.sql.functions as F
from pyspark.sql.functions import col, udf, lag, date_add, explode, lit, concat, unix_timestamp, sum, abs
from pyspark.ml.feature import OneHotEncoder
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.tuning import CrossValidator
from pyspark.ml.feature import StringIndexer
from pyspark.ml.tuning import ParamGridBuilder
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml import Pipeline

sc = SparkContext(appName="MyFirstApp5_Task_task1")
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

df_node2=spark.read.format("csv").load(path="file:///usr/local/spark_code/tjoin.csv", quote="\"", sep=",", inferSchema=True, header=True)
df_node3=df_node2.join(df_node1, "Survived")

df_node4=df_node3.dropna(subset=["PassengerId", "Survived", "Pclass", "Name", "Sex", "Age", "SibSp", "Parch", "Ticket", "Fare", "Cabin", "Embarked"], how="any", thresh=12)

df_node5=df_node4.randomSplit(seed=1234, weights=[0.6, 0.2, 0.2])

df_node5[2].write.format("parquet").save(path="hdfs://namenode:9000/example5/test.parquet")

mmi_value_inputCol_node6 = ["Sex", "Embarked", "Survived"]
mmi_value_outputCol_node6 = ["indexedSex", "indexedEmbarked", "indexedSurvived"]
stages_node6 = []
for i in range(len(mmi_value_inputCol_node6)):
	stages_node6.append(StringIndexer(inputCol=mmi_value_inputCol_node6[i], outputCol=mmi_value_outputCol_node6[i], handleInvalid="error", stringOrderType="frequencyDesc"))

mmi_value_inputCol_node7 = ["indexedSex", "indexedEmbarked"]
mmi_value_outputCol_node7 = ['sexVec', 'embarkedVec']
stages_node7 = []
for i in range(len(mmi_value_inputCol_node7)):
	stages_node7.append(OneHotEncoder(inputCol=mmi_value_inputCol_node7[i], outputCol=mmi_value_outputCol_node7[i]))

pipeline_stage_node8 = VectorAssembler(outputCol="features", inputCols=["Pclass", "sexVec", "Age", "SibSp", "Fare", "embarkedVec"])

stages_node9=[stages_node6, stages_node7, pipeline_stage_node8]
stages_node9 = [i for i in flatten(stages_node9)]
pipeline_node9=Pipeline(stages=stages_node9)
model_node9=pipeline_node9.fit(df_node5[0])
df_node9=model_node9.transform(df_node5[0])
df_node15=model_node9.transform(df_node5[1])
model_node9.save("hdfs://namenode:9000/example5/model_1/")

estimator_node11 = RandomForestClassifier(featureSubsetStrategy="auto", numTrees=20, maxDepth=5, predictionCol="prediction", rawPredictionCol="rawPrediction", probabilityCol="probability", labelCol="indexedSurvived", featuresCol="features", impurity="gini")
evaluator_node12 = MulticlassClassificationEvaluator(labelCol="indexedSurvived", predictionCol="prediction", metricName="accuracy")
param_grid_node13=ParamGridBuilder().addGrid(estimator_node11.maxDepth, [3, 5, 8, 20]).build()
cv_node13=CrossValidator(estimator=estimator_node11, estimatorParamMaps=param_grid_node13, evaluator=evaluator_node12)
model_node13=cv_node13.fit(df_node9)
df_node13=model_node13.transform(df_node9)
df_node16=model_node13.transform(df_node15)
model_node13.save("hdfs://namenode:9000/example5/model_2/")

evaluator_node17 = MulticlassClassificationEvaluator(labelCol="indexedSurvived", predictionCol="prediction", metricName="accuracy")
score_node17=evaluator_node17.evaluate(df_node16)
df_node17= spark.createDataFrame([(score_node17,)], ["score"])

df_node17.write.format("parquet").save(path="hdfs://namenode:9000/example5/EvalResult2.parquet")
