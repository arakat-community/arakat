from src.pipeline_generator.generators import PipelineGenerator

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
                    "path": {"value": "hdfs://namenode:9000/Demo/MainExample/data/titanic_train.csv", "type": "string"},
                    "header": {"value": True, "type": "boolean"},
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
                    "subset": {"value": True, "type": "ALL", "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}},
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
                  "weights": {"value": [0.7, 0.2], "type": "array[double]"},
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
                  "inputCol": {"value": ["sex", "embarked", "survived"], "type": "array[string]"},
                  "outputCol": {"value": ["indexedSex", "indexedEmbarked", "label"], "type": "array[string]"},
                  "stringOrderType": {"value": "frequencyDesc", "type": "string"},
                  "handleInvalid": {"value": "error", "type": "string"}
              }
            },
            "node5":
            {
                "id": "node5",
                "node_id": 69,
                "name": "One-hot Encoder",
                "parent": "node7",
                "category": 8,
                "node_type": 0,
                "family": 18,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": True,
                "is_splitter": False,
                "produces_model": False,
                "transformer_name": "OneHotEncoder",
                "multi_instance_indicator": ["inputCol", "outputCol"],
                "parameters": {
                  "inputCol": {"value": ["indexedSex", "indexedEmbarked"], "type": "array[string]"},
                  "outputCol": {"value": ["sexVec", "embarkedVec"], "type": "string"},
                }
            },
            "node6":
            {
                "id": "node6",
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
                    "inputCols": {"value": ["pclass","sexVec","age","sibsp","fare","embarkedVec"], "type": "array[string]"},
                    "outputCol": {"value": "features", "type": "string"}
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
                    "model_path": {"value": "hdfs://namenode:9000/Demo/MainExample/results/pipeline_model", "type": "string"}
                },
            },
            "node9":
            {
                "id": "node9",
                "parent": "node11",
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
                    "labelCol": {"value": "label", "type": "string"},
                    "predictionCol": {"value": "prediction", "type": "string"},
                    "probabilityCol": {"value": "probability", "type": "string"},
                    "rawPredictionCol": {"value": "rawPrediction", "type": "string"},
                    "numTrees": {"value": 20, "type": "integer"},
                    "maxDepth": {"value": 5, "type": "integer"},
                    "impurity": {"value": "gini", "type": "string"},
                    "featureSubsetStrategy": {"value": "auto", "type": "string"}
                }
            },
            "node10":
            {
                "id": "node10",
                "parent": "node11",
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
                    "labelCol": {"value": "label", "type": "string"},
                    "predictionCol": {"value": "prediction", "type": "string"},
                    "metricName": {"value": "accuracy", "type": "string"}
                },
            },
            "node11":
            {
                "id": "node11",
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
                    "parameter_grid": {"maxDepth": {"value": [3, 5, 8, 20], "type": "array[integer]"}}
                }
            },
            "node12":
            {
                "id": "node12",
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
                    "model_path": {"value": "hdfs://namenode:9000/Demo/MainExample/results/cv_model", "type": "string"}
                },
            },
            "node13":
            {
                "id": "node13",
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
            "node14":
            {
                "id": "node14",
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
            "node15":
            {
                "id": "node15",
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
                    "labelCol": {"value": "label", "type": "string"},
                    "predictionCol": {"value": "prediction", "type": "string"},
                    "metricName": {"value": "accuracy", "type": "string"}
                },
            },
            "node16":
            {
                "id": "node16",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/MainExample/results/validation_eval_result.parquet", "type": "string"}
                }
            },
            "node17":
            {
                "id": "node17",
                "parent": "task2",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/MainExample/data/titanic_test.csv", "type": "string"},
                    "header": {"value": True, "type": "boolean"},
                    "sep": {"value": ",", "type": "string"},
                    "quote": {"value": '\\\"', "type": "string"}
                }
            },
            "node18":
            {
                "id": "node18",
                "parent": "task2",
                "node_id": 62,
                "name": "Batch Write to Kafka Topic",
                "category": 1,
                "node_type": 0,
                "family": 3,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "parameters": {
                    "host": {"value": "kafka", "type": "string"},
                    "port": {"value": "9092", "type": "string"},
                    "topic": {"value": "main_example_test_data", "type": "string"},
                    "unique_column_name": {"value": 'name', "type": "string"}
                }
            },
            "node19":
            {
                "id": "node19",
                "parent": "task3",
                "node_id": 54,
                "name": "Stream Read from Kafka Topic",
                "category": 0,
                "node_type": 0,
                "family": 15,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "can_infer_schema": False,
                "parameters": {
                    "host": {"value": "kafka", "type": "string"},
                    "port": {"value": "9092", "type": "string"},
                    "topic": {"value": "main_example_test_data", "type": "string"},
                    "startingOffsets": {"value": "earliest", "type": "string"},
                    "schema": {
                            "value": {
                                "0": {"column_name": "pclass", "data_type": "FloatType", "is_nullable": True},
                                "1": {"column_name": "name", "data_type": "StringType", "is_nullable": True},
                                "2": {"column_name": "sex", "data_type": "StringType", "is_nullable": True},
                                "3": {"column_name": "age", "data_type": "FloatType", "is_nullable": True},
                                "4": {"column_name": "sibsp", "data_type": "FloatType", "is_nullable": True},
                                "5": {"column_name": "parch", "data_type": "FloatType", "is_nullable": True},
                                "6": {"column_name": "ticket", "data_type": "StringType", "is_nullable": True},
                                "7": {"column_name": "fare", "data_type": "FloatType", "is_nullable": True},
                                "8": {"column_name": "cabin", "data_type": "StringType", "is_nullable": True},
                                "9": {"column_name": "embarked", "data_type": "StringType", "is_nullable": True}
                            },
                            "type": "dict",
                            "special_requirements": {"dict": "schema"}
                        }
                }
            },
            "node20":
            {
              "id":"node20",
              "parent": "task3",
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
                    "subset": {"value": True, "type": "ALL", "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}},
                }
            },
            "node21":
            {
                "id": "node21",
                "parent": "task3",
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
                    "model_path": {"value": "hdfs://namenode:9000/Demo/MainExample/results/pipeline_model", "type": "string"},
                    "model_type": {"value": "PipelineModel", "type": "string"}
                }
            },
            "node22":
            {
                "id": "node22",
                "parent": "task3",
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
                    "model_path": {"value": "hdfs://namenode:9000/Demo/MainExample/results/cv_model", "type": "string"},
                    "model_type": {"value": "CrossValidatorModel", "type": "string"}
                }
            },
            "node23":
            {
                "id": "node23",
                "parent": "task3",
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
            "node24":
            {
                "id": "node24",
                "parent": "task3",
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
            "node25":
            {
                "id": "node25",
                "parent": "task3",
                "node_id": 38,
                "name": "Select-Expression",
                "category": 2,
                "node_type": 0,
                "family": 23,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "parameters": {
                    "expressions": {
                        "value": [
                            {
                                "input_cols": {
                                    "value": ["name", "prediction"],
                                    "type": "array[string]",
                                    "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                                },
                                "output_cols": {
                                    "value": ["Passanger", "IsSurvived"],
                                    "type": "array[string]",
                                    "special_requirements": {"template": "column_selector_template"}
                                },
                                "operation": {"value": "Identity", "type": "string"}
                            }
                        ],
                        "type": "array[object]"
                    }
                }
            },
            "node26":
            {
                "id": "node26",
                "parent": "task3",
                "node_id": 55,
                "name": "Stream Write to CSV",
                "category": 1,
                "node_type": 0,
                "family": 16,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "file_type": "csv",
                "parameters": {
                    "path": {"value": "hdfs://namenode:9000/Demo/MainExample/results/test_data_with_predictions.csv", "type": "string"},
                    "checkpointLocation": {"value": "hdfs://namenode:9000/Demo/MainExample/results/checkpoint_test_data_with_predictions.csv", "type": "string"},
                    "trigger_type": {"value": "processingTime", "type": "string"},
                    "trigger_value": {"value": "2 seconds", "type": "string"}
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
            },
            "task3": {
                "id": "task3",
                "parent": None,
                "node_type": 1
            }
        },
        "edges": {
            "node1-node2": {"type": "dataframe"},
            "node2-node3": {"type": "dataframe"},
            "node3-node7": {"type": "dataframe", "portion": 0},
            "node4-node5": {"type": "pipeline"},
            "node5-node6": {"type": "pipeline"},
            "node7-node8": {"type": "model"},
            "node7-node11": {"type": "dataframe"},
            "node9-node10": {"type": "cv"},
            "node11-node12": {"type": "model"},
            "node3-node13": {"type": "dataframe", "portion": 0},
            "node7-node13": {"type": "model"},
            "node13-node14": {"type": "dataframe"},
            "node11-node14": {"type": "model"},
            "node14-node15": {"type": "dataframe"},
            "node15-node16": {"type": "dataframe"},
            "node17-node18": {"type": "dataframe"},
            "node19-node20": {"type": "dataframe"},
            "node20-node23": {"type": "dataframe"},
            "node21-node23": {"type": "model"},
            "node23-node24": {"type": "dataframe"},
            "node22-node24": {"type": "model"},
            "node24-node25": {"type": "dataframe"},
            "node25-node26": {"type": "dataframe"},
            "task1-task2": {"type": "upstream"},
            "task2-task3": {"type": "upstream"}
        }
    },
    "dag_properties": {
        "app_id": "Demo_MainExample",
        "bash_command": "sh /usr/local/shell_scripts/run.sh",
        "schedule_interval": "@once",
        "default_args": {
            "owner": "airflow",
            "start_date": "01/01/2018"
        }
    }
}

code_info, success, errors, additional_info = PipelineGenerator.generate_pipeline(data["graph"], data["dag_properties"])