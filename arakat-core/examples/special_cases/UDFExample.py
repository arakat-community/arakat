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
                        "udf_input_tuples": {"value": [["c1"], ["c4"], ["c6"]], "type": "array[array[string]]", "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}},
                        "udf_outputs": {"value": ["o1","o2","o3"], "type": "array[string]", "special_requirements": {"template": "column_selector_template"}},
                        "udf_return_type": {"value": "StringType", "type": "string"},
                        "udf_function": {"value": "def Cat1(num):\n\tif num <= 10: return '0-10'\n\telif 10 < num and num <= 20: return '11-20'\n\telif 20 < num and num <= 30: return '21-30'\n\telif 30 < num and num <= 40: return '31-40'\n\telse: return 'morethan40'", "type": "code", "special_requirements": {"code": "code"}}
                    }
                },
                "node3":
                {
                    "id": "node3",
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
                        "udf_input_tuples": {
                            "value": [
                                [
                                    {"value": ["c"], "type": "array"},
                                    {"value": {"start": 1, "end": 4}, "type": "range"}
                                ],
                                [
                                    {"value": ["c"], "type": "array"},
                                    {"value": {"start": 4, "end": 7}, "type": "range"}
                                ]
                        ],
                        "type": "array[template]",
                        "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
                        },
                        "udf_outputs": {"value": ["o1","o2"], "type": "array[string]", "special_requirements": {"template": "column_selector_template"}},
                        "udf_return_type": {"value": "IntegerType", "type": "string"},
                        "udf_function": {"value": "def my_f(arg1,arg2,arg3):\n\tprint('Cool UDF')\n\treturn 1", "type": "code", "special_requirements": {"code": "code"}}
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