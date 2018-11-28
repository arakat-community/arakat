from src.pipeline_generator.generators import PipelineGenerator

data={
    "graph":{
        "nodes": {
            "node1":
            {
                "id": "node1",
                "parent": "task1",
                "node_id": 54,
                "name": "Stream Read from Kafka Topic",
                "category": 0,
                "node_type": 0,
                "family": 15,
                "compatible_with_stream": False,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "can_infer_schema": False,
                "parameters": {
                    "host": {"value": "kafka", "type": "string"},
                    "port": {"value": "9092", "type": "string"},
                    "topic": {"value": "extra1", "type": "string"},
                    "startingOffsets": {"value": "earliest", "type": "string"},
                    "schema": {
                            "value": {
                                "0": {"column_name": "pclass", "data_type": "FloatType", "is_nullable": True},
                                "1": {"column_name": "name", "data_type": "StringType", "is_nullable": True},
                                "2": {"column_name": "sex", "data_type": "StringType", "is_nullable": True},
                                "3": {"column_name": "age", "data_type": "FloatType", "is_nullable": True},
                                "4": {"column_name": "sibsp", "data_type": "FloatType", "is_nullable": True},
                                "5": {"column_name": "parch", "data_type": "FloatType", "is_nullable": True},
                                "6": {"column_name": "ticket", "data_type": "StringType", "is_nullable": True},
                                "7": {"column_name": "fare", "data_type": "FloatType", "is_nullable": True},
                                "8": {"column_name": "cabin", "data_type": "StringType", "is_nullable": True},
                                "9": {"column_name": "embarked", "data_type": "StringType", "is_nullable": True}
                            },
                            "type": "dict",
                            "special_requirements": {"dict": "schema"}
                        }
                }
            },
            "node2":
            {
              "id":"node2",
              "parent": "task1",
              "node_id": 10,
              "name": "Drop NA",
              "category": 2,
              "node_type": 0,
              "family": 5,
              "compatible_with_stream": False,
              "compatible_stream_output_modes": [],
              "compatible_with_spark_pipeline": False,
              "is_splitter": False,
              "produces_model": False,
              "ddfo_name": "dropna",
              "parameters": {
                    "how": {"value": "any", "type": "string"},
                    "subset": {"value": True, "type": "ALL", "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}},
                }
            },
            "node3":
            {
                "id": "node3",
                "parent": "task1",
                "node_id": 58,
                "name": "Stream Write to Kafka Topic",
                "category": 1,
                "node_type": 0,
                "family": 17,
                "compatible_with_stream": True,
                "compatible_stream_output_modes": [],
                "compatible_with_spark_pipeline": False,
                "is_splitter": False,
                "produces_model": False,
                "parameters": {
                    "host": {"value": "kafka", "type": "string"},
                    "port": {"value": "9092", "type": "string"},
                    "topic": {"value": "main_example_test_data", "type": "string"},
                    "checkpointLocation": {"value": "hdfs://namenode:9000/Extras/Extra1/checkpoint1.csv", "type": "string"},
                    "trigger_type": {"value": "processingTime", "type": "string"},
                    "trigger_value": {"value": "2 seconds", "type": "string"},
                    "unique_column_name": {"value": "name", "type": "string"}
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
        "app_id": "Extra1",
        "bash_command": "sh /usr/local/shell_scripts/run.sh",
        "schedule_interval": "@once",
        "default_args": {
            "owner": "airflow",
            "start_date": "01/01/2018"
        }
    }
}

code_info, success, errors, additional_info = PipelineGenerator.generate_pipeline(data["graph"], data["dag_properties"])