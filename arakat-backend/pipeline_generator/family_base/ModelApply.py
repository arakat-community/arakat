from domain.ErrorTypes import ErrorTypes
from validity import IncomingEdgeValidityChecker

import os

def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {1}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    if(error == ErrorTypes.NO_ERROR):
        if(bool(extra["dfs"])):
            df_name="df_"+extra["dfs"][0]
        else:
            df_name = "df_" + extra["portions"][0][0] + "[" + str(extra["portions"][0][1]) + "]"

        model_id=extra["models"][0]

        code = ["df_" + node["id"] + "=" + "model_" + model_id + ".transform(" + df_name + ")", os.linesep]


    return code, error