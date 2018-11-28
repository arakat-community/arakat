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
                    "node_id": 76,
                    "name": "Where",
                    "category": 2,
                    "node_type": 0,
                    "family": 26,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "sql_name": "where",
                    "sql_type": "expression_string_only",
                    "parameters": {
                        "expression": {"value": "c0==1 AND c9 > 0", "type": "string"}
                    }
                },
                "node3":
                {
                    "id": "node3",
                    "parent": "task1",
                    "node_id": 79,
                    "name": "Group By",
                    "category": 2,
                    "node_type": 0,
                    "family": 26,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "sql_name": "groupBy",
                    "sql_type": "col_list_plus_kwargs",
                    "parameters": {
                        "input_columns": {
                            "value": ["c1", "c2"],
                            "type": "array[string]",
                            "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                        }
                    }
                },
                "node4":
                {
                    "id": "node4",
                    "parent": "task1",
                    "node_id": 78,
                    "name": "Order By",
                    "category": 2,
                    "node_type": 0,
                    "family": 26,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "sql_name": "orderBy",
                    "sql_type": "col_list_plus_kwargs",
                    "parameters": {
                        "input_columns": {
                            "value": ["c1", "c2"],
                            "type": "array[string]",
                            "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                        },
                        "kwargs": {
                            "value": {
                                "ascending": {"value": [True, False], "type": "array[boolean]"}
                            },
                            "type": "object"
                        }
                    }
                },
                "node5":
                {
                    "id": "node5",
                    "parent": "task1",
                    "node_id": 78,
                    "name": "Order By",
                    "category": 2,
                    "node_type": 0,
                    "family": 26,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "sql_name": "orderBy",
                    "sql_type": "col_list_plus_kwargs",
                    "parameters": {
                        "input_columns": {
                            "value": ["c1", "c2"],
                            "type": "array[string]",
                            "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                        },
                        "kwargs": {
                            "value": {

                            },
                            "type": "object"
                        }
                    }
                },
                "node6":
                {
                    "id": "node6",
                    "parent": "task1",
                    "node_id": 77,
                    "name": "Aggregation",
                    "category": 2,
                    "node_type": 0,
                    "family": 26,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "sql_name": "agg",
                    "sql_type": "in_op_out_trio",
                    "parameters": {
                        "in_op_out_trio_list": {
                            "value": [
                                {
                                    "input_column": {
                                        "value": "c1",
                                        "type": "string"
                                    },
                                    "output_column": {
                                        "value": "o1",
                                        "type": "string"
                                    },
                                    "operation": {
                                        "value": "avg",
                                        "type": "string"
                                    }
                                }
                            ],
                            "type": "array[object]"
                        }
                    }
                },
                "node7":
                {
                    "id": "node7",
                    "parent": "task1",
                    "node_id": 77,
                    "name": "Aggregation",
                    "category": 2,
                    "node_type": 0,
                    "family": 26,
                    "compatible_with_stream": False,
                    "compatible_stream_output_modes": [],
                    "compatible_with_spark_pipeline": False,
                    "is_splitter": False,
                    "produces_model": False,
                    "sql_name": "agg",
                    "sql_type": "in_op_out_trio",
                    "parameters": {
                        "in_op_out_trio_list": {
                            "value": [
                                {
                                    "input_column": {
                                        "value": "c1",
                                        "type": "string"
                                    },
                                    "output_column": {
                                        "value": "o1",
                                        "type": "string"
                                    },
                                    "operation": {
                                        "value": "avg",
                                        "type": "string"
                                    }
                                },
                                {
                                    "input_column": {
                                        "value": "c2",
                                        "type": "string"
                                    },
                                    "output_column": {
                                        "value": "o2",
                                        "type": "string"
                                    },
                                    "operation": {
                                        "value": "min",
                                        "type": "string"
                                    }
                                },
                                {
                                    "input_column": {
                                        "value": "c3",
                                        "type": "string"
                                    },
                                    "output_column": {
                                        "value": "o3",
                                        "type": "string"
                                    },
                                    "operation": {
                                        "value": "count",
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
            "node1-node2": {"type": "dataframe"},
            "node1-node3": {"type": "dataframe"},
            "node1-node4": {"type": "dataframe"},
            "node1-node5": {"type": "dataframe"},
            "node1-node6": {"type": "dataframe"},
            "node1-node7": {"type": "dataframe"}
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