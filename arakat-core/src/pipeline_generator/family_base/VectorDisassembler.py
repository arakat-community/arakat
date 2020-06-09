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
    shared_function_set = set()
    errors = []
    code=[]
    if(error == ErrorTypes.NO_ERROR):
        if ("portion" in extra["dfs"][0]):
            df_name = "df_" + extra["dfs"][0]["source_id"] + "[" + str(extra["dfs"][0]["portion"]) + "]"
        else:
            df_name = "df_" + extra["dfs"][0]["source_id"]

        shared_function_set.add(SharedFunctionTypes.VECTOR_DISASSEMBLER)
        code=["df_" + node["id"] + " = " + "vector_disassembler(" + df_name + ", " + CodeGenerationUtils.handle_primitive(node["parameters"]["vector_column"]["value"]) + ")", os.linesep]

    return code, shared_function_set, error