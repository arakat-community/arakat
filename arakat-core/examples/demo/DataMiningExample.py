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
                    "path": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/data/orders.csv", "type": "string"},
                    "header": {"value": True, "type": "boolean"},
                    "sep": {"value": ",", "type": "string"},
                    "quote": {"value": '\\\"', "type": "string"}
                }
            },
            "node2":
            {
                "id": "node2",
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
                        "value": ["order_dow"],
                        "type": "array[string]",
                        "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                    }
                }
            },
            "node3":
            {
                "id": "node3",
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
                                    "value": "order_id",
                                    "type": "string"
                                },
                                "output_column": {
                                    "value": "total_orders",
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
                        "value": ["total_orders"],
                        "type": "array[string]",
                        "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                    },
                    "kwargs": {
                        "value": {
                            "ascending": {"value": [False], "type": "array[boolean]"}
                        },
                        "type": "object"
                    }
                }
            },
            "node5":
            {
                "id": "node5",
                "parent": "task1",
                "node_id": 71,
                "name": "UDF",
                "category": 2,
                "node_type": 0,
                "family": 20,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "parameters": {
                    "udf_input_tuples": {"value": [["order_dow"]], "type": "array[array[string]]", "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}},
                    "udf_outputs": {"value": ["day_of_week"], "type": "array[string]", "special_requirements": {"template": "column_selector_template"}},
                    "udf_return_type": {"value": "StringType", "type": "string"},
                    "udf_function": {"value": 'def day_mapper(val):\n\tday_of_week={0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"}\n\treturn day_of_week[val]\n', "type": "code", "special_requirements": {"code": "code"}}
                }
            },
            "node6":
            {
                "id": "node6",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/results/orders_over_days.parquet", "type": "string"}
                }
            },
            "node7":
            {
                "id": "node7",
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
                        "value": ["order_hour_of_day"],
                        "type": "array[string]",
                        "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                    }
                }
            },
            "node8":
            {
                "id": "node8",
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
                                    "value": "order_id",
                                    "type": "string"
                                },
                                "output_column": {
                                    "value": "total_orders",
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
            "node9":
            {
                "id": "node9",
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
                        "value": ["order_hour_of_day"],
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
            "node10":
            {
                "id": "node10",
                "parent": "task1",
                "node_id": 83,
                "name": "Rename Column",
                "category": 14,
                "node_type": 0,
                "family": 5,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "ddfo_name": "withColumnRenamed",
                "parameters": {
                    "existing": {
                        "value": "order_hour_of_day",
                        "type": "string",
                    },
                    "new": {
                        "value": "hour",
                        "type": "string",
                    }
                }
            },
            "node11":
            {
                "id": "node11",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/results/orders_over_hours.parquet", "type": "string"}
                }
            },
            "node12":
            {
                "id": "node12",
                "parent": "task2",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/data/products.csv", "type": "string"},
                    "header": {"value": True, "type": "boolean"},
                    "sep": {"value": ",", "type": "string"},
                    "quote": {"value": '\\\"', "type": "string"}
                }
            },
            "node13":
            {
                "id": "node13",
                "parent": "task2",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/data/departments.csv", "type": "string"},
                    "header": {"value": True, "type": "boolean"},
                    "sep": {"value": ",", "type": "string"},
                    "quote": {"value": '\\\"', "type": "string"}
                }
            },
            "node14":
            {
                "id": "node14",
                "parent": "task2",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/data/order_products__train.csv", "type": "string"},
                    "header": {"value": True, "type": "boolean"},
                    "sep": {"value": ",", "type": "string"},
                    "quote": {"value": '\\\"', "type": "string"}
                }
            },
            "node15":
            {
                "id": "node15",
                "parent": "task2",
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
                    "join_column": {"value": "department_id", "type": "string"}
                }
            },
            "node16":
            {
                "id": "node16",
                "parent": "task2",
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
                        "value": ["department"],
                        "type": "array[string]",
                        "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                    }
                }
            },
            "node17":
            {
                "id": "node17",
                "parent": "task2",
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
                                    "value": "product_id",
                                    "type": "string"
                                },
                                "output_column": {
                                    "value": "products",
                                    "type": "string"
                                },
                                "operation": {
                                    "value": "countDistinct",
                                    "type": "string"
                                }
                            }
                        ],
                        "type": "array[object]"
                    }
                }
            },
            "node18":
            {
                "id": "node18",
                "parent": "task2",
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
                        "value": ["products"],
                        "type": "array[string]",
                        "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                    },
                    "kwargs": {
                        "value": {
                            "ascending": {"value": [False], "type": "array[boolean]"}
                        },
                        "type": "object"
                    }
                }
            },
            "node19":
            {
                "id": "node19",
                "parent": "task2",
                "node_id": 38,
                "name": "Select-Expression",
                "category": 2,
                "node_type": 0,
                "family": 23,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "parameters": {
                    "expressions": {
                        "value": [
                            {
                                "input_cols": {
                                    "value": ["department", "products"],
                                    "type": "array[string]",
                                    "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                                },
                                "output_cols": {
                                    "value": ["department", "products"],
                                    "type": "array[string]",
                                    "special_requirements": {"template": "column_selector_template"}
                                },
                                "operation": {"value": "Identity", "type": "string"}
                            },
                        ],
                        "type": "array[object]"
                    }
                }
            },
            "node20":
            {
                "id": "node20",
                "parent": "task2",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/results/products_over_departments.parquet", "type": "string"}
                }
            },
            "node21":
            {
                "id": "node21",
                "parent": "task2",
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
                    "join_column": {"value": "product_id", "type": "string"}
                }
            },
            "node22":
            {
                "id": "node22",
                "parent": "task2",
                "node_id": 38,
                "name": "Select-Expression",
                "category": 2,
                "node_type": 0,
                "family": 23,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "parameters": {
                    "expressions": {
                        "value": [
                            {
                                "input_cols": {
                                    "value": ["product_name", "order_id"],
                                    "type": "array[string]",
                                    "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                                },
                                "output_cols": {
                                    "value": ["product_name", "order_id"],
                                    "type": "array[string]",
                                    "special_requirements": {"template": "column_selector_template"}
                                },
                                "operation": {"value": "Identity", "type": "string"}
                            },
                        ],
                        "type": "array[object]"
                    }
                }
            },
            "node23":
            {
                "id": "node23",
                "parent": "task2",
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
                        "value": ["order_id"],
                        "type": "array[string]",
                        "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                    }
                }
            },
            "node24":
            {
                "id": "node24",
                "parent": "task2",
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
                                    "value": "product_name",
                                    "type": "string"
                                },
                                "output_column": {
                                    "value": "items",
                                    "type": "string"
                                },
                                "operation": {
                                    "value": "collect_set",
                                    "type": "string"
                                }
                            }
                        ],
                        "type": "array[object]"
                    }
                }
            },
            "node25":
            {
                "id": "node25",
                "parent": "task2",
                "node_id": 12,
                "name": "FP-Growth",
                "category": 13,
                "node_type": 0,
                "family": 6,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": True,
                "is_splitter": False,
                "produces_model": True,
                "estimator_name": "FPGrowth",
                "parameters": {
                    "itemsCol": {"value": "items", "type": "string"},
                    "predictionCol": {"value": "prediction", "type": "string"},
                    "minSupport": {"value": 0.001, "type": "float"},
                    "minConfidence": {"value": 0, "type": "float"},
                    "model_elements_save_paths": {
                        "value": {
                            "associationRules": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/results/associationRules.parquet", "type": "string"},
                            "freqItemsets": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/results/freqItemsets.parquet", "type": "string"}
                        },
                        "type": "object"
                    }
                }
            },
            "node26":
            {
                "id": "node26",
                "parent": "task3",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/results/freqItemsets.parquet", "type": "string"}
                }
            },
            "node27":
            {
                "id": "node27",
                "parent": "task3",
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
                    "expression": {"value": "size(items) > 2", "type": "string"}
                }
            },
            "node28":
            {
                "id": "node28",
                "parent": "task3",
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
                    "path": {"value": "hdfs://namenode:9000/Demo/DataMiningExample/results/freqItemsets2.parquet", "type": "string"}
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
            },
            "task3": {
                "id": "task3",
                "parent": None,
                "node_type": 1
            }
        },
        "edges": {
            "node1-node2": {"type": "dataframe"},
            "node2-node3": {"type": "dataframe"},
            "node3-node4": {"type": "dataframe"},
            "node4-node5": {"type": "dataframe"},
            "node5-node6": {"type": "dataframe"},
            "node1-node7": {"type": "dataframe"},
            "node7-node8": {"type": "dataframe"},
            "node8-node9": {"type": "dataframe"},
            "node9-node10": {"type": "dataframe"},
            "node10-node11": {"type": "dataframe"},
            "node12-node15": {"type": "dataframe", "order": 0},
            "node13-node15": {"type": "dataframe", "order": 1},
            "node15-node16": {"type": "dataframe"},
            "node16-node17": {"type": "dataframe"},
            "node17-node18": {"type": "dataframe"},
            "node18-node19": {"type": "dataframe"},
            "node19-node20": {"type": "dataframe"},
            "node12-node21": {"type": "dataframe", "order": 0},
            "node14-node21": {"type": "dataframe", "order": 1},
            "node21-node22": {"type": "dataframe"},
            "node22-node23": {"type": "dataframe"},
            "node23-node24": {"type": "dataframe"},
            "node24-node25": {"type": "dataframe"},
            "node26-node27": {"type": "dataframe"},
            "node27-node28": {"type": "dataframe"},
            "task1-task2": {"type": "upstream"},
            "task2-task3": {"type": "upstream"}
        }
    },
    "dag_properties": {
        "app_id": "DataMiningExample",
        "bash_command": "sh /usr/local/shell_scripts/run.sh",
        "schedule_interval": "@once",
        "default_args": {
            "owner": "airflow",
            "start_date": "01/01/2018"
        }
    }
}

code_info, success, errors, additional_info = PipelineGenerator.generate_pipeline(data["graph"], data["dag_properties"])