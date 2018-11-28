import os

from src.utils.code_generation import MultiInstanceHandlerUtils

from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker


def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra= IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
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

        # Depending on the column that multi_instance_indicator indicates, we will decide to apply whether to multi-instance generation or usual generation
        if (MultiInstanceHandlerUtils.should_generate_multiple_instances(node)):
            code = MultiInstanceHandlerUtils.multi_instance_generation(node, df_name, my_args)
        else:
            code = __single_generation(node, df_name, my_args)

    return code, shared_function_set, error

def __single_generation(node, df_name, args):
    code= CodeGenerationUtils.handle_instantination_or_call(node["parameters"], 'transformer_' + node["id"] + ' = ' + node["transformer_name"] + '(', args)
    code.extend(['df_' + node["id"] + "=" + 'transformer_' + node["id"] + '.transform(' + df_name + ')', os.linesep])
    return code