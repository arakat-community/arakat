from pipeline_generator import PipelineGenerator

# Although UI may send all node-specs, in this example I will omit some of them...

graph={
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
                    "file_path": "filepath.csv",
                    "header": True,
                    "sep": ","
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
              "parameters": {}
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
                  "weights": [0.7, 0.3],
                  "seed": 1234
              }
            },
        "node4":
            {
              "id":"node4",
              "parent": "node9",
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
              "parameters": {
                  "outputCol": "Sex",
                  "inputCol": "indexedSex"
              }
            },
        "node5":
            {
                "id":"node5",
                "parent": "node9",
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
                "parameters": {
                    "outputCol": "Embarked",
                    "inputCol": "indexedEmbarked"
                }
            },
        "node6":
            {
                "id": "node6",
                "parent": "node9",
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
                "parameters": {
                    "outputCol": "Survived",
                    "inputCol": "indexedSurvived"
                }
            },
        "node7":
            {
                "id": "node7",
                "parent": "node9",
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
                    "inputCols": ["Pclass","sexVec","Age","SibSp","Fare","embarkedVec"],
                    "outputCol": "features"
                }
            },
        "node8":
            {
                "id": "node8",
                "parent": "node21",
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
                    "featuresCol": "features",
                    "labelCol": "indexedSurvived"
                }
            },
        "node9":
            {
                "id": "node9",
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
        "node10":
            {
                "id": "node10",
                "parent": "node21",
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
                    "labelCol":"indexedSurvived",
                    "predictionCol":"prediction",
                    "metricName":"accuracy"
                },
            },
        "node11":
            {
                "id": "node11",
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
                    "model_path": "path_to_save_model"
                },
            },
        "node12":
            {
                "id": "node12",
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
        "node13":
            {
                "id": "node13",
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
                    "labelCol":"indexedSurvived",
                    "predictionCol":"prediction",
                    "metricName":"accuracy"
                },
            },
        "node15":
            {
                "id": "node15",
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
                    "file_path": "targetfilepathForEvalResult2.parquet"
                }
            },
        "node16":
            {
                "id": "node16",
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
                    "file_path": "filepath.orc"
                }
            },
        "node17":
            {
                "id": "node17",
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
                    "model_path": "pathToMyModel",
                    "model_type": "CrossValidatorModel"
                }
            },
        "node18":
            {
                "id": "node18",
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
        "node19":
            {
                "id": "node19",
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
                    "labelCol":"indexedSurvived",
                    "predictionCol":"prediction",
                    "metricName":"accuracy"
                },
            },
        "node20":
            {
                "id": "node20",
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
                    "file_path": "targetfilepathForEvalResult3.csv"
                }
            },
        "node21":
            {
                "id": "node21",
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
                    "parameter_grid":{}
                }
            },
        "node22":
            {
                "id": "node22",
                "parent": "task1",
                "node_id": 49,
                "name": "Batch Read from Parquet",
                "category": 0,
                "node_type": 0,
                "family": 0,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "can_infer_schema": False,
                "file_type": "parquet",
                "parameters": {
                    "file_path": "filepath2.parquet"
                }
            },
        "node23":
            {
                "id": "node23",
                "parent": "task1",
                "node_id": 68,
                "name": "Join",
                "category": 2,
                "node_type": 0,
                "family": 8,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "parameters": {
                    "join_column": "column_name_to_join"
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
        "node1-node23": {"type": "dataframe"},
        "node22-node23": {"type": "dataframe"},
        "node23-node2": {"type": "dataframe"},
        "node2-node3": {"type": "dataframe"},
        "node3-node9": {"type": "portion", "portion_id": 0},
        "node4-node5": {"type": "pipeline"},
        "node5-node6": {"type": "pipeline"},
        "node6-node7": {"type": "pipeline"},
        "node9-node21": {"type": "dataframe"},
        "node8-node10": {"type": "cv"},
        "node21-node11": {"type": "model"},
        "node3-node12": {"type": "portion", "portion_id": 1},
        "node21-node12": {"type": "model"},
        "node12-node13": {"type": "dataframe"},
        "node13-node15": {"type": "dataframe"},
        "node16-node18": {"type": "dataframe"},
        "node17-node18": {"type": "model"},
        "node18-node19": {"type": "dataframe"},
        "node19-node20": {"type": "dataframe"},
        "task1-task2": {"type": "upstream"}
    }
}


args={
    "scheduler_args": {
        "spark_runner_path": "my_spark_runner_path",
        "dag_args": {
            "app_id": "MyFirstApp",
            "default_args": {
                "owner": "airflow",
                "start_date": "01/01/2018",
                "end_date": "02/01/2018",
            },
            "schedule_interval": "@once"
        }
    },
    "script_args": {

    }
}

success, errors = PipelineGenerator.generate_pipeline(graph, args)