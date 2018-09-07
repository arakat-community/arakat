from domain.ErrorTypes import ErrorTypes
from utils import CodeGenerationUtils
from validity import IncomingEdgeValidityChecker

import os

def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    if(error == ErrorTypes.NO_ERROR):
        if(bool(extra["dfs"])):
            df_name="df_"+extra["dfs"][0]
        else:
            df_name = "df_" + extra["portions"][0][0] + "[" + str(extra["portions"][0][1]) + "]"

        code = ['transformer_' + node["id"] + ' = ' + node["transformer_name"] + '(']
        for param in node["parameters"]:
            code.extend([param + "=" + CodeGenerationUtils.arrange_parameter_value(node["parameters"][param]), ", "])
        code.pop()
        code.extend([")", os.linesep])

        code.extend(['df_' + node["id"] + "=" + 'transformer_' +  node["id"] + '.transform(' + df_name + ')', os.linesep])

    return code, error