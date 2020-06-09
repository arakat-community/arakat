import os

from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import CVValiditiyChecker
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
        error, extra2= CVValiditiyChecker.check_validity(node["nodes"], node["edges"])

        if ("portion" in extra["dfs"][0]):
            df_name = "df_" + extra["dfs"][0]["source_id"] + "[" + str(extra["dfs"][0]["portion"]) + "]"
        else:
            df_name = "df_" + extra["dfs"][0]["source_id"]

        my_args = {"node_id": node["id"], "input_dfs": [df_name], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}
        gen_code=[]
        gen_code.extend(__generate_code_for_estimator_instantination(node["nodes"][extra2["estimator_node_id"]], my_args))
        gen_code.extend(__generate_code_for_evaluator_instantination(node["nodes"][extra2["evaluator_node_id"]], my_args))
        gen_code.extend(__generate_code_for_param_grid(node, 'estimator_' + extra2["estimator_node_id"], my_args))
        gen_code.extend(__generate_code_for_cv_instantination(node, extra2["estimator_node_id"], extra2["evaluator_node_id"]))

        gen_code.extend(['model_' + node["id"] + "=" + 'cv_' + node["id"] + ".fit(" + df_name + ")", os.linesep])
        # Following might not be logical unless you aim to predict on training data for some specific needs.
        gen_code.extend(['df_' + node["id"] + "=" + 'model_' + node["id"] + '.transform(' + df_name + ')', os.linesep])

        final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error

def __generate_code_for_cv_instantination(cv_node, estimator_node_id, evaluator_node_id):
    return ['cv_'+cv_node["id"] + "=CrossValidator(estimator=", 'estimator_' + estimator_node_id + ", estimatorParamMaps=param_grid_" + cv_node["id"] + ", evaluator=" + 'evaluator_' + evaluator_node_id +")", os.linesep]

def __generate_code_for_estimator_instantination(node, args):
    return CodeGenerationUtils.handle_instantination_or_call(node["parameters"], 'estimator_' + node["id"] + ' = ' + node["estimator_name"] + '(', args)

def __generate_code_for_evaluator_instantination(node, args):
    return CodeGenerationUtils.handle_instantination_or_call(node["parameters"], 'evaluator_' + node["id"] + ' = ' + node["evaluator_name"] + '(', args)

def __generate_code_for_param_grid(node, cur_estimator_name, args):
    # In the future handle this in special requirement handler for parameters
    code=["param_grid_" + node["id"] + "=", "None", os.linesep]
    # Assuming that fix parameters are given in the estimator itself.
    # Maybe reconsider this part.
    grid_params = node["parameters"]["parameter_grid"]
    if(bool(grid_params)):
        code.pop()
        code.pop()
        code.extend(["ParamGridBuilder()"])
        for param in grid_params:
            code.extend([".addGrid(" + cur_estimator_name + "." + param + ", " + CodeGenerationUtils.handle_parameter(grid_params[param], args) + ")"])
        code.extend([".build()", os.linesep])

    return code