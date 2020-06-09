import os

from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker


def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {0}, "model_count": {0}}
    error, extra= IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    shared_function_set = set()
    if(error == ErrorTypes.NO_ERROR):

        code = ["model_" + node["id"] + "=" + node["parameters"]["model_type"]["value"] +".load(" + CodeGenerationUtils.handle_primitive(node["parameters"]["model_path"]["value"]) + ")", os.linesep]

    return code, shared_function_set, error