from domain.ErrorTypes import ErrorTypes
from validity import IncomingEdgeValidityChecker
from utils.code_generation import CodeGenerationUtils
from domain.SharedFunctionTypes import SharedFunctionTypes

import os

def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    shared_function_set = set()
    additional_local_code = []
    errors = []
    if(error == ErrorTypes.NO_ERROR):
        if ("portion" in extra["dfs"][0]):
            df_name = "df_" + extra["dfs"][0]["source_id"] + "[" + str(extra["dfs"][0]["portion"]) + "]"
        else:
            df_name = "df_" + extra["dfs"][0]["source_id"]

        my_args = {"node_id": node["id"], "input_dfs": [df_name], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}

        shared_function_set.add(SharedFunctionTypes.SELECT_EXPR_HELPERS)
        code.append("df_" + node["id"] + "=" + df_name + ".selectExpr(")

        for expr in node["parameters"]["expressions"]["value"]:
           code.extend(['single_select_expr_generator('+ CodeGenerationUtils.handle_parameter(expr["input_cols"]["value"], my_args) +', ' + CodeGenerationUtils.handle_parameter(expr["output_cols"]["value"], my_args) + ', '+ expr["operation"]["value"] +')', ', '])

        code.pop()
        code.extend([")", os.linesep])