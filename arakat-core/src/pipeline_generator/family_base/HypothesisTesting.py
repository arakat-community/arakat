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
    if(error == ErrorTypes.NO_ERROR):
        if ("portion" in extra["dfs"][0]):
            df_name = "df_" + extra["dfs"][0]["source_id"] + "[" + str(extra["dfs"][0]["portion"]) + "]"
        else:
            df_name = "df_" + extra["dfs"][0]["source_id"]

        if(error==ErrorTypes.NO_ERROR):
            # For now, directly returns the correlation result (as a dataframe) which includes (in a row~):
            # pValues: DenseVector
            # degreesOfFreedom: list
            # statistics: DenseVector
            final_code=["df_" + node["id"] + " = " + node["parameters"]["test_type"]["value"] + ".test(" + df_name + ", " + CodeGenerationUtils.handle_primitive(node["parameters"]["features_column"]["value"]) + ", " + CodeGenerationUtils.handle_primitive(node["parameters"]["label_column"]["value"]) + ")", os.linesep]

    return final_code, shared_function_set, error