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
                    "node_id": 73,
                    "name": "Rolling Statistics",
                    "category": 6,
                    "node_type": 0,
                    "family": 22,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": True,
                    "is_splitter": False,
                    "produces_model": False,
                    "parameters": {
                        "rolling_stats_info":
                            {
                            "value": {
                                "between_operation": {"value": "-", "type": "string"},
                                "first_argument":{
                                    "value":
                                        {
                                        "operation": {"value": "min", "type": "string"},
                                        "input_cols": {"value": ["c1", "c2", "c3"], "type": "array[string]"}
                                        },
                                    "type": "object"
                                }
                                ,
                                "second_argument": {
                                    "value":
                                        {
                                        "operation": {"value": "Identity", "type": "string"},
                                        "input_cols": {"value": ["c1", "c2", "c3"], "type": "array[string]"}
                                        },
                                    "type": "object"
                                },
                                "output_cols": {"value": ["o1","o2","o3"], "type": "array[string]"},
                                "partitioning_column": {"value": "pCol", "type": "string"},
                                "ordering_column": {"value": "oCol", "type": "string"},
                                "ordering_direction": {"value": "desc", "type": "string"},
                                "lags": {"value": [3,7,14,30,90], "type": "array[integer]"}
                            },
                            "type": "object"
                        }
                    }
                },
                "node3":
                {
                    "id": "node3",
                    "parent": "task1",
                    "node_id": 73,
                    "name": "Rolling Statistics",
                    "category": 6,
                    "node_type": 0,
                    "family": 22,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": True,
                    "is_splitter": False,
                    "produces_model": False,
                    "parameters": {
                        "rolling_stats_info":
                            {
                            "value": {
                                "between_operation": {"value": "-", "type": "string"},
                                "first_argument":{
                                    "value":
                                        {
                                        "operation": {"value": "Identity", "type": "string"},
                                        "input_cols": {
                                            "value": [
                                                {"value": ["pca_"], "type": "array"},
                                                {"value": {"start": 1, "end": 21}, "type": "range"},
                                                {"value": ["_warn"], "type": "array"},
                                            ],
                                            "type": "template",
                                            "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template"}
                                            }
                                        },
                                    "type": "object"
                                }
                                ,
                                "second_argument": {
                                    "value":
                                        {
                                        "operation": {"value": "mean", "type": "string"},
                                        "input_cols": {
                                            "value": [
                                                {"value": ["pca_"], "type": "array"},
                                                {"value": {"start": 1, "end": 21}, "type": "range"},
                                                {"value": ["_warn"], "type": "array"},
                                            ],
                                            "type": "template",
                                            "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template"}
                                            }
                                        },
                                    "type": "object"
                                },
                                "output_cols": {
                                    "value": [
                                        {"value": ["pca_"], "type": "array"},
                                        {"value": {"start": 1, "end": 21}, "type": "range"},
                                        {"value": ["_warn_rollingdiff_"], "type": "array"}
                                    ],
                                    "type": "template",
                                    "special_requirements": {"template": "column_selector_template"}
                                },
                                "partitioning_column": {"value": "pCol", "type": "string"},
                                "ordering_column": {"value": "oCol", "type": "string"},
                                "ordering_direction": {"value": "desc", "type": "string"},
                                "lags": {"value": [3,7,14,30,90], "type": "array[integer]"}
                            },
                            "type": "object"
                        }
                    }
                },
                "node4":
                {
                    "id": "node4",
                    "parent": "task1",
                    "node_id": 73,
                    "name": "Rolling Statistics",
                    "category": 6,
                    "node_type": 0,
                    "family": 22,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": True,
                    "is_splitter": False,
                    "produces_model": False,
                    "parameters": {
                        "rolling_stats_info":
                            {
                            "value": {
                                "between_operation": {"value": "Identity", "type": "string"},
                                "first_argument":{
                                    "value":
                                        {
                                        "operation": {"value": "mean", "type": "string"},
                                        "input_cols": {
                                            "value": [
                                                {"value": ["pca_"], "type": "array"},
                                                {"value": {"start": 1, "end": 21}, "type": "range"},
                                                {"value": ["_warn"], "type": "array"}
                                            ],
                                            "type": "template",
                                            "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template"}
                                            }
                                        },
                                    "type": "object"
                                },
                                "output_cols": {
                                    "value": [
                                        {"value": ["pca_"], "type": "array"},
                                        {"value": {"start": 1, "end": 21}, "type": "range"},
                                        {"value": ["_warn_rollingmean_"], "type": "array"}
                                    ],
                                    "type": "template",
                                    "special_requirements": {"template": "column_selector_template"}
                                },
                                "partitioning_column": {"value": "pCol", "type": "string"},
                                "ordering_column": {"value": "oCol", "type": "string"},
                                "ordering_direction": {"value": "desc", "type": "string"},
                                "lags": {"value": [3,7,14,30,90], "type": "array[integer]"}
                            },
                            "type": "object"
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
            "node1-node2": {"type": "dataframe"},
            "node1-node3": {"type": "dataframe"},
            "node1-node4": {"type": "dataframe"}
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