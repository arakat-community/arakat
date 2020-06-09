import os

from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker


# Add other join options as well
# How about join cascades
# Add necessary checks for stream-stream, stream-batch joins...
# Note that for stream-static joins, stream df must be on left.
def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {2}, "model_count": {0}}
    error, extra= IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    shared_function_set = set()
    if(error == ErrorTypes.NO_ERROR):
        df_names=__get_dfs_to_join(extra)
        code.extend(["df_" + node["id"] + "=" + df_names[0] + ".join(" + df_names[1] + ", " + CodeGenerationUtils.handle_primitive(node["parameters"]["join_column"]["value"]) + ")", os.linesep])

    return code, shared_function_set, error

def __get_dfs_to_join(extra):
    # IncomingEdgeValidityChecker return a sorted list of df info by the order given by user.
    # For now, we allow only two dataframes to be joined. However, we can handle a cascade of joins as well.
    # For this purpose, change node-specs of join to get more than one column name to join, and then generate each join-statement code...
    df_names=[]
    for elem in extra["dfs"]:
        if ("portion" in elem):
            df_names.append("df_" + elem["source_id"] + "[" + str(elem["portion"]) + "]")
        else:
            df_names.append("df_" + elem["source_id"])

    return df_names