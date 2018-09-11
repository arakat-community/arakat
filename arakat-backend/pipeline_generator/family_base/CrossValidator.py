from domain.ErrorTypes import ErrorTypes
from utils import CodeGenerationUtils
from validity import IncomingEdgeValidityChecker
from validity import CVValiditiyChecker

import os

def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    if(error == ErrorTypes.NO_ERROR):
        error, extra2=CVValiditiyChecker.check_validity(node["nodes"], node["edges"])

        if(bool(extra["dfs"])):
            df_name="df_"+extra["dfs"][0]
        else:
            df_name = "df_" + extra["portions"][0][0] + "[" + str(extra["portions"][0][1]) + "]"

        code.extend(__generate_code_for_estimator_instantination(node["nodes"][extra2["estimator_node_id"]]))
        code.extend(__generate_code_for_evaluator_instantination(node["nodes"][extra2["evaluator_node_id"]]))
        code.extend(__generate_code_for_param_grid(node, 'estimator_' + extra2["estimator_node_id"]))
        code.extend(__generate_code_for_cv_instantination(node, extra2["estimator_node_id"], extra2["evaluator_node_id"]))

        code.extend(['model_' + node["id"] + "=" + 'cv_' + node["id"] + ".fit(" + df_name + ")", os.linesep])
        # Following might not be logical unless you aim to predict on training data for some specific needs.
        code.extend(['df_' + node["id"] + "=" + 'model_' + node["id"] + '.transform(' + df_name + ')', os.linesep])

    return code, error

def __generate_code_for_cv_instantination(cv_node, estimator_node_id, evaluator_node_id):
    return ['cv_'+cv_node["id"] + "=CrossValidator(estimator=", 'estimator_' + estimator_node_id + ", estimatorParamMaps=param_grid_" + cv_node["id"] + ", evaluator=" + 'evaluator_' + evaluator_node_id +")", os.linesep]

def __generate_code_for_estimator_instantination(node):
    code = ['estimator_' + node["id"] + ' = ' + node["estimator_name"] + '(']
    for param in node["parameters"]:
        code.extend([param + "=" + CodeGenerationUtils.arrange_parameter_value(node["parameters"][param]), ", "])
    if (len(node["parameters"]) > 0):
        code.pop()
    code.extend([")", os.linesep])
    return code

def __generate_code_for_param_grid(node, cur_estimator_name):
    code=["param_grid_" + node["id"] + "=None"]
    # Assuming that fix parameters are given in the estimator itself.
    # Maybe reconsider this part.
    grid_params = node["parameters"]["parameter_grid"]
    if(bool(grid_params)):
        code = ["param_grid_" + node["id"] + "=ParamGridBuilder()"]
        for param in grid_params:
            code.extend([".addGrid("+cur_estimator_name + "." + param + ", "+ CodeGenerationUtils.arrange_parameter_value(grid_params[param])+")"])
        code.extend([".build()", os.linesep])

    return code

def __generate_code_for_evaluator_instantination(node):
    code = ['evaluator_' + node["id"] + ' = ' + node["evaluator_name"] + '(']
    for param in node["parameters"]:
        code.extend([param + "=" + CodeGenerationUtils.arrange_parameter_value(node["parameters"][param]), ", "])
    if (len(node["parameters"]) > 0):
        code.pop()
    code.extend([")", os.linesep])
    return code