from pipeline_generator.generators import PipelineGenerator

graph={
    "nodes": {
        "node1":
            {
                "id": "node1",
                "name": "Batch Read from CSV",
                "category": 0,
                "parent": "task1",
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
                    "header": False,
                    "sep": ",",
                    "quote": '\"'
                },
                "df_constraints": [],
                "explanation": "Batch read from csv."
            },
        "node2":
            {
                "id": "node2",
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
                    "file_path": "targetfilepath.parquet"
                },
                "df_constraints": [],
                "explanation": "Batch write to parquet."
            },
        "task1": {
            "id": "task1",
            "parent": None,
            "node_type": 1
        }
    },
    "edges": {"node1-node2": {"type": "dataframe"}}
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