from domain.ErrorTypes import ErrorTypes
from utils import CodeGenerationUtils
from validity import IncomingEdgeValidityChecker

import os

def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {0}, "model_count": {1}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    if(error == ErrorTypes.NO_ERROR):

        model_id=extra["models"][0]

        code = ["model_" + model_id + ".save("+CodeGenerationUtils.arrange_parameter_value(node["parameters"]["model_path"])+")", os.linesep]

    return code, error