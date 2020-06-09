import os

from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker


def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {0}, "model_count": {1}}
    error, extra= IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    shared_function_set = set()
    if(error == ErrorTypes.NO_ERROR):

        model_id=extra["models"][0]["source_id"]

        code = ["model_" + model_id + ".save(" + CodeGenerationUtils.handle_primitive(node["parameters"]["model_path"]["value"]) + ")", os.linesep]

    return code, shared_function_set, error