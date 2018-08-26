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

        code = ['evaluator_' + node["id"] + ' = ' + node["evaluator_name"] + '(']
        for param in node["parameters"]:
            code.extend([param + "=" + CodeGenerationUtils.arrange_parameter_value(node["parameters"][param]), ", "])
        if (len(node["parameters"]) > 0):
            code.pop()
        code.extend([")", os.linesep])

        code.extend(['score_' + node["id"] + "=" + 'evaluator_' +  node["id"] + '.evaluate(' + df_name + ')', os.linesep])
        code.extend(['df_' + node["id"] + "=" + ' spark.createDataFrame([' + 'score_' + node["id"] + '], ["score"])'])

    return code, error