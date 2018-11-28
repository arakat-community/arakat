import os

from src.domain.ErrorTypes import ErrorTypes
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

        gen_code = __sql_handlers[node["sql_type"]](node, my_args)

        final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error

# We could separate this logic into several node families. However, I'd like to keep it together for now...

def __handle_expression_string_only(node, args):
    code=["df_" + args["node_id"] + " = " + args["input_dfs"][0], os.linesep]
    code.extend(["df_" + args["node_id"] + " = " + "df_" + args["node_id"] + "." + node["sql_name"] + "(" + CodeGenerationUtils.handle_primitive(node["parameters"]["expression"]["value"]) + ")", os.linesep])
    return code

def __handle_col_list_plus_kwargs(node, args):
    kwargs_str=[]
    if("kwargs" in node["parameters"]):
        kwargs=node["parameters"]["kwargs"]["value"]
        # If there are parameters for kwargs and all them is optional; and if user do not provide any of them, then we assume that there will be an empty dictionary here...
        for elem in kwargs:
            kwargs_str.extend([", ", elem, "=", CodeGenerationUtils.handle_parameter(kwargs[elem], args)])

    code = ["df_" + args["node_id"] + " = " + args["input_dfs"][0], os.linesep]
    code.extend(["df_" + args["node_id"] + " = " + "df_" + args["node_id"] + "." + node["sql_name"] + "(" + CodeGenerationUtils.handle_parameter(node["parameters"]["input_columns"], args)])
    code.extend(kwargs_str)
    code.extend([")", os.linesep])

    return code

def __handle_in_op_out_trio(node, args):
    in_op_out_trio_list = node["parameters"]["in_op_out_trio_list"]["value"]

    code = ["df_" + args["node_id"] + " = " + args["input_dfs"][0], os.linesep]
    code.extend(["df_" + args["node_id"] + " = " + "df_" + args["node_id"] + ".agg("])
    for elem in in_op_out_trio_list:
        code.extend(["F." + elem["operation"]["value"] + "(" + CodeGenerationUtils.handle_primitive(elem["input_column"]["value"]) + ").alias(" + CodeGenerationUtils.handle_primitive(elem["output_column"]["value"]) + ")", ", "])

    # Assuming that there is at least 1 agg request. However, check this and produce error before got here...
    code.pop()
    code.extend([")", os.linesep])

    return code

__sql_handlers={"expression_string_only": __handle_expression_string_only, "col_list_plus_kwargs": __handle_col_list_plus_kwargs, "in_op_out_trio": __handle_in_op_out_trio}