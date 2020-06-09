from NodeFamilyTypes import NodeFamilyTypes

__import_statements={0: ["from pyspark.ml.recommendation import ALS"],
                     1: ["from pyspark.ml.evaluation import BinaryClassificationEvaluator"],
                     2: ["from pyspark.ml.feature import ChiSqSelector"],
                     3: ["from pyspark.ml.clustering import ClusteringEvaluatorNode"],
                     4: [],
                     5: ["from pyspark.ml.classification import DecisionTreeClassifier"],
                     6: ["from pyspark.ml.regression import DecisionTreeRegressor"],
                     7: [],
                     8: [],
                     9: [],
                     10: [],
                     11: [],
                     12: ["from pyspark.ml.fpm import FPGrowth"],
                     13: ["from pyspark.ml.clustering import GaussianMixture"],
                     14: ["from pyspark.ml.classification import GBTClassifier"],
                     15: ["from pyspark.ml.regression import GBTRegressor"],
                     16: ["from pyspark.ml.feature import Imputer"],
                     17: ["from pyspark.ml.regression import IsotonicRegression"],
                     18: ["from pyspark.ml.clustering import KMeans"],
                     19: ["from pyspark.ml.clustering import LDA"],
                     20: ["from pyspark.ml.regression import LinearRegression"],
                     21: ["from pyspark.ml.classification import LinearSVC"],
                     22: ["from pyspark.ml.classification import LogisticRegression"],
                     23: ["from pyspark.ml.feature import MaxAbsScaler"],
                     24: ["from pyspark.ml.feature import MinMaxScaler"],
                     25: ["from pyspark.ml.evaluation import MulticlassClassificationEvaluator"],
                     26: ["from pyspark.ml.classification import MultilayerPerceptronClassifier"],
                     27: ["from pyspark.ml.classification import NaiveBayes"],
                     28: ["from pyspark.ml.feature import NGram"],
                     29: ["from pyspark.ml.feature import Normalizer"],
                     30: [],
                     31: ["from pyspark.ml.feature import PCA"],
                     32: ["from pyspark.ml.classification import RandomForestClassifier"],
                     33: ["from pyspark.ml.regression import RandomForestRegressor"],
                     34: [],
                     35: ["from pyspark.ml.evaluation import RegressionEvaluator"],
                     36: [],
                     37: ["from pyspark.ml.feature import RFormula"],
                     38: [],
                     39: [],
                     40: ["from pyspark.ml.feature import SQLTransformer"],
                     41: ["from pyspark.ml.feature import StandardScaler"],
                     42: ["from pyspark.ml.feature import StringIndexer"],
                     43: [],
                     44: ["from pyspark.ml.feature import VectorAssembler"],
                     45: ["from pyspark.ml.feature import Vectorndexer"],
                     46: ["from pyspark.ml.feature import VectorSlicer"],
                     47: [],
                     48: [],
                     49: [],
                     50: [],
                     51: [],
                     52: [],
                     53: [],
                     54: [],
                     55: [],
                     56: [],
                     57: [],
                     58: [],
                     59: [],
                     60: [],
                     61: [],
                     62: [],
                     63: {
                            "PipelineModel":["from pyspark.ml import PipelineModel"],
                            "BucketedRandomProjectionLSHModel":["from pyspark.ml.feature import BucketedRandomProjectionLSHModel"],
                            "ChiSqSelectorModel":["from pyspark.ml.feature import ChiSqSelectorModel"],
                            "CountVectorizerModel":["from pyspark.ml.feature import CountVectorizerModel"],
                            "IDFModel":["from pyspark.ml.feature import IDFModel"],
                            "ImputerModel":["from pyspark.ml.feature import ImputerModel"],
                            "MaxAbsScalerModel":["from pyspark.ml.feature import MaxAbsScalerModel"],
                            "MinHashLSHModel":["from pyspark.ml.feature import MinHashLSHModel"],
                            "MinMaxScalerModel":["from pyspark.ml.feature import MinMaxScalerModel"],
                            "OneHotEncoderModel":["from pyspark.ml.feature import OneHotEncoderModel"],
                            "PCAModel":["from pyspark.ml.feature import PCAModel"],
                            "RFormulaModel":["from pyspark.ml.feature import RFormulaModel"],
                            "StandardScalerModel":["from pyspark.ml.feature import StandardScalerModel"],
                            "StringIndexerModel":["from pyspark.ml.feature import StringIndexerModel"],
                            "VectorIndexerModel":["from pyspark.ml.feature import VectorIndexerModel"],
                            "Word2VecModel":["from pyspark.ml.feature import Word2VecModel"],
                            "LinearSVCModel":["from pyspark.ml.classification import LinearSVCModel"],
                            "LogisticRegressionModel":["from pyspark.ml.classification import LogisticRegressionModel"],
                            "DecisionTreeClassificationModel":["from pyspark.ml.classification import DecisionTreeClassificationModel"],
                            "GBTClassificationModel":["from pyspark.ml.classification import GBTClassificationModel"],
                            "RandomForestClassificationModel":["from pyspark.ml.classification import RandomForestClassificationModel"],
                            "NaiveBayesModel":["from pyspark.ml.classification import NaiveBayesModel"],
                            "MultilayerPerceptronClassificationModel":["from pyspark.ml.classification import MultilayerPerceptronClassificationModel"],
                            "OneVsRestModel":["from pyspark.ml.classification import OneVsRestModel"],
                            "BisectingKMeansModel":["from pyspark.ml.clustering import BisectingKMeansModel"],
                            "KMeansModel":["from pyspark.ml.clustering import KMeansModel"],
                            "GaussianMixtureModel":["from pyspark.ml.clustering import GaussianMixtureModel"],
                            "LDAModel":["from pyspark.ml.clustering import LDAModel"],
                            "LocalLDAModel":["from pyspark.ml.clustering import LocalLDAModel"],
                            "DistributedLDAModel":["from pyspark.ml.clustering import DistributedLDAModel"],
                            "ALSModel":["from pyspark.ml.recommendation import ALSModel"],
                            "AFTSurvivalRegressionModel":["from pyspark.ml.regression import AFTSurvivalRegressionModel"],
                            "DecisionTreeRegressionModel":["from pyspark.ml.regression import DecisionTreeRegressionModel"],
                            "GBTRegressionModel":["from pyspark.ml.regression import GBTRegressionModel"],
                            "GeneralizedLinearRegressionModel":["from pyspark.ml.regression import GeneralizedLinearRegressionModel"],
                            "IsotonicRegressionModel":["from pyspark.ml.regression import IsotonicRegressionModel"],
                            "LinearRegressionModel":["from pyspark.ml.regression import LinearRegressionModel"],
                            "RandomForestRegressionModel":["from pyspark.ml.regression import RandomForestRegressionModel"],
                            "CrossValidatorModel":["from pyspark.ml.tuning import CrossValidatorModel"],
                            "TrainValidationSplitModel":["from pyspark.ml.tuning import TrainValidationSplitModel"],
                            "FPGrowthModel":["from pyspark.ml.fpm import FPGrowthModel"],
                            "JavaPredictionModel":["from pyspark.ml.util import JavaPredictionModel"]
                        },
                     64: [],
                     65: [],
                     66: ["from pyspark.ml.tuning import CrossValidator", "from pyspark.ml.tuning import ParamGridBuilder"],
                     67: ["from pyspark.ml import Pipeline"],
                     68: [],
                     69: ["from pyspark.ml.feature import OneHotEncoder"],
                     70: [],
                     71: ["from pyspark.sql.functions import udf"],
                     72: ["from pyspark.sql.window import Window"],
                     73: [],
                     74: ["from pyspark.ml.stat import Correlation"],
                     75: ["from pyspark.ml.stat import ChiSquareTest"],
                     76: [],
                     77: [],
                     78: [],
                     79: [],
                     80: [],
                     81: [],
                     82: [],
                     83: [],
		     84: []
                     }

def get_import_statements(node):
    node_family=node["family"]
    node_id=node["node_id"]
    if(node_family == NodeFamilyTypes.ModelLoad.value):
        return __import_statements[node_id][node["parameters"]["model_type"]["value"]]
    elif("nodes" in node):
        nested_imports=__import_statements[node_id]
        for node_id in node["nodes"]:
            nested_imports.extend(__import_statements[node["nodes"][node_id]["node_id"]])
        return nested_imports
    else:
        return __import_statements[node_id]
