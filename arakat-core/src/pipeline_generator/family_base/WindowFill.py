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

        input_cols = CodeGenerationUtils.handle_parameter(node["parameters"]["input_cols"], my_args)
        output_cols = CodeGenerationUtils.handle_parameter(node["parameters"]["output_cols"], my_args)

        window_size = node["parameters"]["window_size"]["value"]
        partitioning_column = node["parameters"]["partitioning_column"]["value"]
        ordering_column = node["parameters"]["ordering_column"]["value"]
        ordering_direction = node["parameters"]["ordering_direction"]["value"]
        gen_code=[]
        gen_code.extend(["input_cols = " + output_cols, os.linesep])
        gen_code.extend(["output_cols = " + input_cols, os.linesep])
        gen_code.extend(["df_" + node["id"] + "=" + df_name, os.linesep])
        gen_code.extend(["for inC, outC in zip(input_cols, output_cols):", os.linesep])
        gen_code.extend(["\tdf_" + node["id"] + " = df_" + node["id"] + ".withColumn('temp', col(inC))", os.linesep])
        gen_code.extend(["\twSpec = Window.partitionBy('" + partitioning_column + "').orderBy(col('" + ordering_column + "')." + ordering_direction + "())", os.linesep])
        gen_code.extend(["\tfor j in range(" + str(window_size) + "):", os.linesep])
        gen_code.extend(["\t\tlag_values = lag('temp', default=0).over(wSpec)", os.linesep])
        gen_code.extend(["\t\tdf_" + node["id"] + " = df_" + node["id"] + ".withColumn('temp', F.when((col('temp')==1) | (lag_values==None) | (lag_values<1) | (lag_values>=" + str(window_size + 1) + "), col('temp')).otherwise(lag_values+1))", os.linesep])
        gen_code.extend(["\tdf_" + node["id"] + " = df_" + node["id"] + ".withColumn(outC, F.when(col('temp') > 0, 1.0).otherwise(0.0))", os.linesep])

        final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error