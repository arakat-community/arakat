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

        code.append("query_" + node["id"] + "=" + df_name + ".writeStream.format("+CodeGenerationUtils.arrange_parameter_value(node["file_type"])+")")
        code.append(".trigger("+ __generate_trigger_code(node) +")")
        code.append('.option("path", '+ CodeGenerationUtils.arrange_parameter_value(node["parameters"]["file_path"]) + ")")
        code.append('.option("checkpointLocation", ' + CodeGenerationUtils.arrange_parameter_value(node["parameters"]["checkpoint_path"]) + ").start()")
        code.extend([os.linesep, "query_" + node["id"], ".awaitTermination()", os.linesep])

    return code, error

def __generate_trigger_code(node):
    trigger_type=node["parameters"]["trigger_type"]
    if(trigger_type == "once"):
        return "once=True"
    else:
        return trigger_type + "=" + "'" + str(node["parameters"]["trigger_value"])+" seconds'"