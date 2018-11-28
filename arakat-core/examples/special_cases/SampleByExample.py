from src.pipeline_generator.generators import PipelineGenerator

data={
    "graph": {
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
                  "node_id": 81,
                  "name": "Sample By",
                  "category": 2,
                  "node_type": 0,
                  "family": 5,
                  "compatible_with_stream": False,
                  "compatible_stream_output_modes": [],
                  "compatible_with_spark_pipeline": False,
                  "is_splitter": False,
                  "produces_model": False,
                  "ddfo_name": "sampleBy",
                  "parameters": {
                        "col": {"value": "c1", "type": "string"},
                        "fractions": {"value": {"class1": 0.1, "class2": 0.2, "class3": 0.5}, "type": "dict", "special_requirements": {"dict": "simple_dict"}},
                        "seed": {"value": 1234, "type": "integer"}
                    }
                },
                "node3":
                {
                  "id":"node3",
                  "parent": "task1",
                  "node_id": 81,
                  "name": "Sample By",
                  "category": 2,
                  "node_type": 0,
                  "family": 5,
                  "compatible_with_stream": False,
                  "compatible_stream_output_modes": [],
                  "compatible_with_spark_pipeline": False,
                  "is_splitter": False,
                  "produces_model": False,
                  "ddfo_name": "sampleBy",
                  "parameters": {
                        "col": {"value": "label", "type": "string"},
                        "fractions": {"value": {0: 0.1, 1: 0.2, 3: 0.5}, "type": "dict", "special_requirements": {"dict": "simple_dict"}},
                        "seed": {"value": 1234, "type": "integer"}
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
            "node1-node3": {"type": "dataframe"}
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