from pipeline_generator.generators import PipelineGenerator

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
                "parent": "node9",
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
        "node14":
            {
                "id": "node14",
                "parent": "task1",
                "node_id": 60,
                "name": "Batch Write to Orc",
                "category": 1,
                "node_type": 0,
                "family": 2,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "file_type": "orc",
                "parameters": {
                    "file_path": "targetfilepathForEvalResult1.orc"
                }
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
        "task1": {
            "id": "task1",
            "parent": None,
            "node_type": 1
        }
    },
    "edges": {
        "node1-node2": {"type": "dataframe"},
        "node2-node3": {"type": "dataframe"},
        "node3-node9": {"type": "portion", "portion_id": 0},
        "node4-node5": {"type": "pipeline"},
        "node5-node6": {"type": "pipeline"},
        "node6-node7": {"type": "pipeline"},
        "node7-node8": {"type": "pipeline"},
        "node9-node10": {"type": "dataframe"},
        "node9-node11": {"type": "model"},
        "node3-node12": {"type": "portion", "portion_id": 1},
        "node9-node12": {"type": "model"},
        "node12-node13": {"type": "dataframe"},
        "node10-node14": {"type": "dataframe"},
        "node13-node15": {"type": "dataframe"}
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