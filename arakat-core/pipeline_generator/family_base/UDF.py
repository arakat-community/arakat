import os

from domain.ErrorTypes import ErrorTypes
from validity import IncomingEdgeValidityChecker
from utils.code_generation import CodeGenerationUtils


def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    shared_function_set = set()
    additional_local_code=[]
    errors=[]
    if(error == ErrorTypes.NO_ERROR):
        if ("portion" in extra["dfs"]):
            df_name = "df_" + extra["dfs"][0]["source_id"] + "[" + str(extra["dfs"][0]["portion"]) + "]"
        else:
            df_name = "df_" + extra["dfs"][0]["source_id"]

        my_args={"node_id": node["id"], "input_dfs": [df_name], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}

        updated_function_name = CodeGenerationUtils.handle_parameter(node["parameters"]["udf_function"], my_args)
        code.extend(["udf_"+node["id"]+" = udf("+updated_function_name+", "+node["parameters"]["udf_return_type"]+"())"])

        code.extend(["tuple_list = " + CodeGenerationUtils.handle_parameter(node["parameters"]["udf_input_tuples"], my_args), os.linesep])
        code.extend(["output_list = " + CodeGenerationUtils.handle_parameter(node["parameters"]["udf_outputs"], my_args), os.linesep])
        code.extend(["df_" + node["id"] + "=" + df_name, os.linesep])
        code.extend(["for index in range(len(tuple_list)):", os.linesep])
        code.extend(["\tdf_"+node["id"]+" = df_"+node["id"]+".withColumn(output_list[index], udf_"+node["id"]+"(*tuple_list[index]))", os.linesep, os.linesep])

        code = [additional_local_code, os.linesep].extend(code)

    return code, shared_function_set, error