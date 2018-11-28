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

        gen_code=[]
        gen_code.extend(CodeGenerationUtils.handle_instantination_or_call(node["parameters"], 'evaluator_' + node["id"] + ' = ' + node["evaluator_name"] + '(', my_args))

        gen_code.extend(['score_' + node["id"] + "=" + 'evaluator_' +  node["id"] + '.evaluate(' + df_name + ')', os.linesep])
        gen_code.extend(['df_' + node["id"] + "=" + ' spark.createDataFrame([(' + 'score_' + node["id"] + ',)], ["score"])', os.linesep])

        final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error