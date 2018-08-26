from domain.ErrorTypes import ErrorTypes
from validity import IncomingEdgeValidityChecker
from utils import CodeGenerationUtils

import os

def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    if(error == ErrorTypes.NO_ERROR):
        if (bool(extra["dfs"])):
            df_name = "df_" + extra["dfs"][0]
        else:
            df_name = "df_" + extra["portions"][0][0] + "[" + str(extra["portions"][0][1]) + "]"

        code.append(df_name + '.selectExpr("CAST('+ node["parameters"]["unique_column_name"] +' AS STRING) AS key", "to_json(struct(*)) AS value").write.format("kafka").option("kafka.bootstrap.servers", ')
        code.append(CodeGenerationUtils.arrange_parameter_value(node["parameters"]["host"] + ":" + node["parameters"]["port"]) + ")")
        code.extend(['.option("topic", ' + CodeGenerationUtils.arrange_parameter_value(node["parameters"]["topic"]) + ").save()", os.linesep])

    return code, error