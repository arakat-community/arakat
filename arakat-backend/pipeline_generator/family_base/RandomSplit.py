from domain.ErrorTypes import ErrorTypes
from utils import CodeGenerationUtils
from validity import IncomingEdgeValidityChecker

import os

def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    if(error == ErrorTypes.NO_ERROR):
        if(bool(extra["dfs"])):
            df_name="df_"+extra["dfs"][0]
        else:
            df_name = "df_" + extra["portions"][0][0] + "[" + str(extra["portions"][0][1]) + "]"

        code.extend(["df_"+node["id"] + "="+df_name+ ".randomSplit("+CodeGenerationUtils.arrange_parameter_value(node["parameters"]["weights"])+", "+CodeGenerationUtils.arrange_parameter_value(node["parameters"]["seed"])+")", os.linesep])

    return code, error