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
                    "path": {"value": "hdfs://namenode:9000/Demo/SimpleExample/data/wine_data.csv", "type": "string"},
                    "header": {"value": False, "type": "boolean"},
                    "sep": {"value": ",", "type": "string"},
                    "quote": {"value": '\\\"', "type": "string"}
                }
            },
            "node2":
            {
                "id": "node2",
                "parent": "task1",
                "node_id": 7,
                "name": "Descriptive Statistics",
                "category": 14,
                "node_type": 0,
                "family": 5,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "ddfo_name": "describe",
                "parameters": {}
            },
            "node3":
            {
                "id": "node3",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/SimpleExample/results/wine_statistics.parquet", "type": "string"}
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
            "node2-node3": {"type": "dataframe"}
        }
    },
    "dag_properties": {
        "app_id": "Demo_SimpleExample",
        "bash_command": "sh /usr/local/shell_scripts/run.sh",
        "schedule_interval": "@once",
        "default_args": {
            "owner": "airflow",
            "start_date": "01/01/2018"
        }
    }
}

code_info, success, errors, additional_info = PipelineGenerator.generate_pipeline(data["graph"], data["dag_properties"])