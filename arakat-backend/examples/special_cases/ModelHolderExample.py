from pipeline_generator.generators import PipelineGenerator

graph = {
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
                "id": "node2",
                "parent": "task1",
                "node_id": 41,
                "name": "Standard Scaler",
                "category": 7,
                "node_type": 0,
                "family": 6,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": True,
                "is_splitter": False,
                "produces_model": True,
                "estimator_name": "StandardScaler",
                "parameters": {
                    "inputCol": "features",
                    "outputCol": "scaledFeatures",
                    "withMean": False,
                    "withStd": True
                }
            },
        "node3":
            {
                "id": "node3",
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
        "node4":
            {
                "id": "node4",
                "parent": "node3",
                "node_id": 70,
                "name": "Model Holder",
                "category": 3,
                "node_type": 0,
                "family": 19,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": True,
                "is_splitter": False,
                "produces_model": False,
                "parameters": {},
            },
        "node5":
            {
                "id": "node5",
                "parent": "node3",
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
                    "featuresCol": "scaledFeatures",
                    "labelCol": "label"
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
        "node1-node3": {"type": "dataframe"},
        "node4-node5": {"type": "pipeline"},
        "node2-node4": {"type": "model"}
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
