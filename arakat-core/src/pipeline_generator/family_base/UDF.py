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
    additional_local_code=[]
    errors=[]
    if(error == ErrorTypes.NO_ERROR):
        if ("portion" in extra["dfs"]):
            df_name = "df_" + extra["dfs"][0]["source_id"] + "[" + str(extra["dfs"][0]["portion"]) + "]"
        else:
            df_name = "df_" + extra["dfs"][0]["source_id"]

        my_args={"node_id": node["id"], "input_dfs": [df_name], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}

        updated_function_name = CodeGenerationUtils.handle_parameter(node["parameters"]["udf_function"], my_args)
        gen_code=[]
        gen_code.extend(["udf_"+node["id"]+" = udf("+updated_function_name+", "+node["parameters"]["udf_return_type"]["value"]+"())", os.linesep])

        gen_code.extend(["tuple_list = " + CodeGenerationUtils.handle_parameter(node["parameters"]["udf_input_tuples"], my_args), os.linesep])
        gen_code.extend(["output_list = " + CodeGenerationUtils.handle_parameter(node["parameters"]["udf_outputs"], my_args), os.linesep])
        gen_code.extend(["df_" + node["id"] + "=" + df_name, os.linesep])
        gen_code.extend(["for index in range(len(tuple_list)):", os.linesep])
        gen_code.extend(["\tdf_"+node["id"]+" = df_"+node["id"]+".withColumn(output_list[index], udf_"+node["id"]+"(*tuple_list[index]))", os.linesep, os.linesep])

        final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error