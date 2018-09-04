from domain.ErrorTypes import ErrorTypes
from utils import CodeGenerationUtils
from validity import IncomingEdgeValidityChecker

import os

def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {0}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    if(error == ErrorTypes.NO_ERROR):

        code = ["model_" + node["id"] + "=" + node["parameters"]["model_type"] +".load(" + CodeGenerationUtils.arrange_parameter_value(node["parameters"]["model_path"])+")", os.linesep]

    return code, error