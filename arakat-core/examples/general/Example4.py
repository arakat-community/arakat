from pipeline_generator.generators import PipelineGenerator

# Although UI may send all node-specs, in this example I will omit some of them...

data={
    "graph":{
        "nodes": {
            "node1":
                {
                    "id": "node1",
                    "parent": "task1",
                    "name": "Batch Read from CSV",
                    "category": 0,
                    "node_id": 47,
                    "node_type": 0,
                    "family": 0,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "can_infer_schema": True,
                    "file_type": "csv",
                    "parameters": {
                        "path": {"value": "filepath.csv", "type": "string"},
                        "header": {"value": False, "type": "boolean"},
                        "sep": {"value": ",", "type": "string"},
                        "quote": {"value": '\\\"', "type": "string"}
                    }
                },
            "node2":
                {
                  "id":"node2",
                  "parent": "task1",
                  "node_id": 10,
                  "name": "Drop NA",
                  "category": 2,
                  "node_type": 0,
                  "family": 5,
                  "compatible_with_stream": False,
                  "compatible_stream_output_modes": [],
                  "compatible_with_spark_pipeline": False,
                  "is_splitter": False,
                  "produces_model": False,
                  "ddfo_name": "dropna",
                  "parameters": {
                        "how": {"value": "any", "type": "string"},
                        "thresh": {"value": 3, "type": "integer"},
                        "subset": {"value": ["c1", "c2", "c3"], "type": "array[string]"},
                    }
                },
            "node3":
                {
                  "id":"node3",
                  "parent": "task1",
                  "node_id": 34,
                  "name": "Random Splitter",
                  "category": 2,
                  "node_type": 0,
                  "family": 13,
                  "compatible_with_stream": False,
                  "compatible_stream_output_modes": [],
                  "compatible_with_spark_pipeline": False,
                  "is_splitter": False,
                  "produces_model": False,
                  "parameters": {
                      "weights": {"value": [0.7, 0.3], "type": "array[double]"},
                      "seed": {"value": 1234, "type": "integer"},
                  }
                },
            "node4":
                {
                  "id":"node4",
                  "parent": "node7",
                  "node_id": 42,
                  "name": "String Indexer",
                  "category": 2,
                  "node_type": 0,
                  "family": 6,
                  "compatible_with_stream": False,
                  "compatible_stream_output_modes": [],
                  "compatible_with_spark_pipeline": True,
                  "is_splitter": False,
                  "produces_model": True,
                  "estimator_name": "StringIndexer",
                  "multi_instance_indicator": ["inputCol", "outputCol"],
                  "parameters": {
                      "inputCol": {"value": ["Sex", "Embarked", "Survived"], "type": "array[string]"},
                      "outputCol": {"value": ["indexedSex", "indexedEmbarked", "indexedSurvived"], "type": "array[string]"},
                      "stringIndexerOrderType": {"value": "frequencyDesc", "type": "string"},
                      "handleInvalid": {"value": "error", "type": "string"}
                  }
                },
            "node5":
                {
                    "id": "node5",
                    "parent": "node7",
                    "node_id": 44,
                    "name": "Vector Assembler",
                    "category": 2,
                    "node_type": 0,
                    "family": 18,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": True,
                    "is_splitter": False,
                    "produces_model": False,
                    "transformer_name": "VectorAssembler",
                    "parameters": {
                        "inputCol": {"value": ["Pclass","sexVec","Age","SibSp","Fare","embarkedVec"], "type": "array[string]"},
                        "outputCol": {"value": "features", "type": "string"}
                    }
                },
            "node6":
                {
                    "id": "node6",
                    "parent": "node18",
                    "node_id": 32,
                    "name": "Random Forest Classifier",
                    "category": 11,
                    "node_type": 0,
                    "family": 6,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": True,
                    "is_splitter": False,
                    "produces_model": True,
                    "estimator_name": "RandomForestClassifier",
                    "parameters": {
                        "featuresCol": {"value": "features", "type": "string"},
                        "labelCol": {"value": "indexedSurvived", "type": "string"},
                        "predictionCol": {"value": "prediction", "type": "string"},
                        "probabilityCol": {"value": "probability", "type": "string"},
                        "rawPredictionCol": {"value": "rawPrediction", "type": "string"},
                        "numTrees": {"value": 20, "type": "integer"},
                        "maxDepth": {"value": 5, "type": "integer"},
                        "impurity": {"value": "gini", "type": "string"},
                        "featureSubsetStrategy": {"value": "auto", "type": "string"}
                    }
                },
            "node7":
                {
                    "id": "node7",
                    "parent": "task1",
                    "node_id": 67,
                    "name": "Pipeline",
                    "category": 3,
                    "node_type": 2,
                    "family": 12,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": True,
                    "parameters": {},
                },
            "node8":
                {
                    "id": "node8",
                    "parent": "node18",
                    "node_id": 25,
                    "name": "Multi-class Classification Evaluator",
                    "category": 12,
                    "node_type": 0,
                    "family": 7,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "evaluator_name": "MulticlassClassificationEvaluator",
                    "parameters": {
                        "labelCol": {"value": "indexedSurvived", "type": "string"},
                        "predictionCol": {"value": "prediction", "type": "string"},
                        "metricName": {"value": "accuracy", "type": "string"}
                    },
                },
            "node9":
                {
                    "id": "node9",
                    "parent": "task1",
                    "node_id": 64,
                    "name": "Model Saver",
                    "category": 3,
                    "node_type": 0,
                    "family": 11,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "parameters": {
                        "model_path": {"value": "path_to_save_model", "type": "string"}
                    },
                },
            "node10":
                {
                    "id": "node10",
                    "parent": "task1",
                    "node_id": 65,
                    "name": "Model Apply",
                    "category": 3,
                    "node_type": 0,
                    "family": 9,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "parameters": {},
                },
            "node11":
                {
                    "id": "node11",
                    "parent": "task1",
                    "node_id": 25,
                    "name": "Multi-class Classification Evaluator",
                    "category": 12,
                    "node_type": 0,
                    "family": 7,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "evaluator_name": "MulticlassClassificationEvaluator",
                    "parameters": {
                        "labelCol": {"value": "indexedSurvived", "type": "string"},
                        "predictionCol": {"value": "prediction", "type": "string"},
                        "metricName": {"value": "accuracy", "type": "string"}
                    },
                },
            "node12":
                {
                    "id": "node12",
                    "parent": "task1",
                    "node_id": 61,
                    "name": "Batch Write to Parquet",
                    "category": 1,
                    "node_type": 0,
                    "family": 2,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "file_type": "parquet",
                    "parameters": {
                        "path": {"value": "targetfilepathForEvalResult2.parquet", "type": "string"}
                    }
                },
                "node13":
                {
                    "id": "node13",
                    "parent": "task2",
                    "node_id": 48,
                    "name": "Batch Read from Orc",
                    "category": 0,
                    "node_type": 0,
                    "family": 0,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "can_infer_schema": False,
                    "file_type": "orc",
                    "parameters": {
                        "path": {"value": "filepath.orc", "type": "string"}
                    }
                },
                "node14":
                {
                    "id": "node14",
                    "parent": "task2",
                    "node_id": 63,
                    "name": "Model Loader",
                    "category": 3,
                    "node_type": 0,
                    "family": 10,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": True,
                    "parameters": {
                        "model_path": {"value": "pathToMyModel", "type": "string"},
                        "model_type": {"value": "PipelineModel", "type": "string"}
                    }
                },
                "node15":
                {
                    "id": "node15",
                    "parent": "task2",
                    "node_id": 65,
                    "name": "Model Apply",
                    "category": 3,
                    "node_type": 0,
                    "family": 9,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "parameters": {},
                },
                "node16":
                {
                    "id": "node16",
                    "parent": "task2",
                    "node_id": 25,
                    "name": "Multi-class Classification Evaluator",
                    "category": 12,
                    "node_type": 0,
                    "family": 7,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "evaluator_name": "MulticlassClassificationEvaluator",
                    "parameters": {
                        "labelCol": {"value": "indexedSurvived", "type": "string"},
                        "predictionCol": {"value": "prediction", "type": "string"},
                        "metricName": {"value": "accuracy", "type": "string"}
                    },
                },
                "node17":
                {
                    "id": "node17",
                    "parent": "task2",
                    "node_id": 59,
                    "name": "Batch Write to CSV",
                    "category": 1,
                    "node_type": 0,
                    "family": 2,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "file_type": "csv",
                    "parameters": {
                        "path": {"value": "targetfilepathForEvalResult3.csv", "type": "string"}
                    }
                },
                "node18":
                {
                    "id": "node18",
                    "parent": "task1",
                    "node_id": 66,
                    "name": "Cross Validator",
                    "category": 3,
                    "node_type": 3,
                    "family": 4,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": True,
                    "parameters": {
                        "parameter_grid": {}
                    }
                },
            "task1": {
                "id": "task1",
                "parent": None,
                "node_type": 1
            },
            "task2": {
                "id": "task2",
                "parent": None,
                "node_type": 1
            }
        },
        "edges": {
            "node1-node2": {"type": "dataframe"},
            "node2-node3": {"type": "dataframe"},
            "node3-node7": {"type": "dataframe", "portion": 0},
            "node4-node5": {"type": "pipeline"},
            "node7-node18": {"type": "dataframe"},
            "node6-node8": {"type": "cv"},
            "node18-node9": {"type": "model"},
            "node3-node10": {"type": "dataframe", "portion": 1},
            "node18-node10": {"type": "model"},
            "node10-node11": {"type": "dataframe"},
            "node11-node12": {"type": "dataframe"},
            "node13-node15": {"type": "dataframe"},
            "node14-node15": {"type": "model"},
            "node15-node16": {"type": "dataframe"},
            "node16-node17": {"type": "dataframe"},
            "task1-task2": {"type": "upstream"}
        }
    },
    "dag_properties": {
        "app_id": "MyFirstApp",
        "code_base_path": "path_to_put_spark_scripts",
        "schedule_interval": "@once",
        "default_args": {
            "owner": "airflow",
            "start_date": "01/01/2018"
        },
        "spark_operator_conf": {
            "conn_id": "spark_con_py",
            "depends_on_past": False,
            "conf": {'spark.pyspark.python': '/usr/bin/python2.7'}
        }
    }
}

code_info, success, errors = PipelineGenerator.generate_pipeline(data["graph"], data["dag_properties"])