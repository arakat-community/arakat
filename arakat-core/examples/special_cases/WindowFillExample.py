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
                        "path": {"value": "filepath.csv", "type": "string"},
                        "header": {"value": False, "type": "boolean"},
                        "sep": {"value": ",", "type": "string"},
                        "quote": {"value": '\\\"', "type": "string"}
                    }
                },
                "node2":
                {
                    "id": "node2",
                    "parent": "task1",
                    "node_id": 72,
                    "name": "Window Fill",
                    "category": 4,
                    "node_type": 0,
                    "family": 21,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": True,
                    "is_splitter": False,
                    "produces_model": False,
                    "parameters": {
                        "input_cols": {
                            "value": ["label_tmp"],
                            "type": "array[string]",
                            "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                        },
                        "output_cols": {
                            "value": ["label_tmp"],
                            "type": "array[string]",
                            "special_requirements": {"template": "column_selector_template"}
                        },
                        "partitioning_column": {"value": "deviceid", "type": "string"},
                        "ordering_column": {"value": "date", "type": "string"},
                        "ordering_direction": {"value": "desc", "type": "string"},
                        "window_size": {"value": 7, "type": "integer"}
                    }
                },
            "task1": {
                "id": "task1",
                "parent": None,
                "node_type": 1
            }
        },

        "edges": {
            "node1-node2": {"type": "dataframe"}
        }
    },
    "dag_properties": {
        "app_id": "MyFirstApp",
        "bash_command": "sh /usr/local/shell_scripts/run.sh",
        "schedule_interval": "@once",
        "default_args": {
            "owner": "airflow",
            "start_date": "01/01/2018"
        }
    }
}

code_info, success, errors, additional_info = PipelineGenerator.generate_pipeline(data["graph"], data["dag_properties"])