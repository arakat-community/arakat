from domain.ErrorTypes import ErrorTypes
from utils import CodeGenerationUtils
from validity import IncomingEdgeValidityChecker

import os

# Add other join options as well
# Allow user to specify which dataframe is on left or right
# How about join cascades
# Add necessary checks for stream-stream, stream-batch joins...
def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {2}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    if(error == ErrorTypes.NO_ERROR):
        df_names=__get_dfs_to_join(extra)
        code.extend(["df_"+node["id"] + "="+df_names[0] + ".join(" + df_names[1] + ", " + CodeGenerationUtils.arrange_parameter_value(node["parameters"]["join_column"]) + ")", os.linesep])

    return code, error

def __get_dfs_to_join(extra):
    # In the future, this should handle, left-right dfs and cascades...
    # Also, for stream-static joins, stream df must be on left.
    df_names=[]
    for elem in extra["dfs"]:
        df_names.append("df_" + elem)

    for elem in extra["portions"]:
        df_names.append("df_" + elem[0] + "[" + str(elem[1]) + "]")

    return df_names