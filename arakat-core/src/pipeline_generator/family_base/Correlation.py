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
            final_code=["correlation_" + node["id"] + " = " +"Correlation.corr(" + df_name + ", " + CodeGenerationUtils.handle_primitive(node["parameters"]["column"]["value"]) + ", " + CodeGenerationUtils.handle_primitive(node["parameters"]["method"]["value"]) + ")", os.linesep]
            final_code.extend(["result_array_" + node["id"] + " = ", "correlation_"+ node["id"] + ".head()[0].toArray()", os.linesep])
            # In the future, dynamically name columns according to an appropriate convention...
            final_code.extend(["df_" + node["id"] + " = sc.parallelize("+ "result_array_" + node["id"] +")",".map(lambda x: [float(i) for i in x]).toDF()", os.linesep])

    return final_code, shared_function_set, error