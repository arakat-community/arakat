import os

from domain.ErrorTypes import ErrorTypes
from utils.code_generation import CodeGenerationUtils
from validity import IncomingEdgeValidityChecker


def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    shared_function_set = set()
    if(error == ErrorTypes.NO_ERROR):
        if ("portion" in extra["dfs"][0]):
            df_name = "df_" + extra["dfs"][0]["source_id"] + "[" + str(extra["dfs"][0]["portion"]) + "]"
        else:
            df_name = "df_" + extra["dfs"][0]["source_id"]

        code.append(df_name + '.selectExpr("CAST('+ node["parameters"]["unique_column_name"]["value"] +' AS STRING) AS key", "to_json(struct(*)) AS value").write.format("kafka").option("kafka.bootstrap.servers", ')
        code.append(CodeGenerationUtils.handle_primitive(node["parameters"]["host"]["value"] + ":" + node["parameters"]["port"]["value"]) + ")")
        code.extend(['.option("topic", ' + CodeGenerationUtils.handle_primitive(node["parameters"]["topic"]["value"]) + ").save()", os.linesep])

    return code, shared_function_set, error