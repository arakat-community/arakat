import os

from src.domain.ErrorTypes import ErrorTypes
from src.domain.SharedFunctionTypes import SharedFunctionTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker


def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra= IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    final_code=[]
    shared_function_set = set()
    additional_local_code = []
    errors = []
    if(error == ErrorTypes.NO_ERROR):
        if ("portion" in extra["dfs"][0]):
            df_name = "df_" + extra["dfs"][0]["source_id"] + "[" + str(extra["dfs"][0]["portion"]) + "]"
        else:
            df_name = "df_" + extra["dfs"][0]["source_id"]

        my_args = {"node_id": node["id"], "input_dfs": [df_name], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}
        gen_code=[]

        shared_function_set.add(SharedFunctionTypes.SELECT_EXPR_HELPERS)

        gen_code.extend(["expressions_" + node["id"] + "=[]", os.linesep])
        for expr in node["parameters"]["expressions"]["value"]:
            gen_code.extend(["expressions_" + node["id"] + ".extend(", 'single_select_expr_generator(' + CodeGenerationUtils.handle_parameter(expr["input_cols"], my_args) + ', ' + CodeGenerationUtils.handle_parameter(expr["output_cols"], my_args) + ', ' + CodeGenerationUtils.handle_parameter(expr["operation"], my_args) + '))', os.linesep])

        gen_code.extend(["df_" + node["id"] + "=" + df_name + ".selectExpr(" + "*expressions_" + node["id"] + ")", os.linesep])

        final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error