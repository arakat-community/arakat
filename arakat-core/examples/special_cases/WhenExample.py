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
                    "id": "node2",
                    "parent": "task1",
                    "node_id": 80,
                    "name": "When",
                    "category": 2,
                    "node_type": 0,
                    "family": 27,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "parameters": {
                        "expressions": {
                            "value": [
                                {
                                    "input_columns": {
                                        "value": [
                                            {"value": ["part1_"], "type": "array"},
                                            {"value": {"start": 1, "end": 4}, "type": "range"},
                                            {"value": ["_part2"], "type": "array"}
                                        ],
                                        "type": "template",
                                        "special_requirements": {"template": "column_selector_template"}
                                    },
                                    "output_columns": {
                                        "value": [
                                            {"value": ["part1_"], "type": "array"},
                                            {"value": {"start": 1, "end": 4}, "type": "range"},
                                            {"value": ["_part2_out"], "type": "array"}
                                        ],
                                        "type": "template",
                                        "special_requirements": {"template": "column_selector_template"}
                                    },
                                    "condition": {
                                        "value": "$ > 3",
                                        "type": "string"
                                    },
                                    "value": {
                                        "value": 5,
                                        "type": "integer"
                                    },
                                    "otherwise": {
                                        "value": 42,
                                        "type": "integer"
                                    }
                                },
                                {
                                    "input_columns": {
                                        "value": ["part1_4_part2", "part1_5_part2", "part1_6_part2"],
                                        "type": "array[string]",
                                        "special_requirements": {"template": "column_selector_template"}
                                    },
                                    "output_columns": {
                                        "value": ["part1_4_part2_out", "part1_5_part2_out", "part1_6_part2_out"],
                                        "type": "array[string]",
                                        "special_requirements": {"template": "column_selector_template"}
                                    },
                                    "condition": {
                                        "value": "$ == 'oops'",
                                        "type": "string"
                                    },
                                    "value": {
                                        "value": "cool",
                                        "type": "string"
                                    },
                                    "otherwise": {
                                        "value": "not cool",
                                        "type": "string"
                                    }
                                }
                            ],
                            "type": "array[object]"
                        }
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