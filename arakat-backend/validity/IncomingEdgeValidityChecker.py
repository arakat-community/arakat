from domain.ErrorTypes import ErrorTypes

def check_validity(node_id, requireds_info, edges, checklist):
    # Assuming that there is no order among incoming edges.
    # In such a case, keep extra info in edges.

    error=ErrorTypes.NO_ERROR
    extra={"models":[], "dfs":[], "portions":[]}

    if(node_id in requireds_info):
        for req in requireds_info[node_id]:
            edge = edges[req + "-" + node_id]
            if(edge["type"]=="dataframe"):
                extra["dfs"].append(req)
            elif(edge["type"]=="portion"):
                extra["portions"].append([req, edge["portion_id"]])
            elif(edge["type"]=="model"):
                extra["models"].append(req)
            else:
                error=ErrorTypes.UNDEFINED_EDGE_ERROR

    df_count=len(extra["dfs"]) + len(extra["portions"])
    if(df_count not in  checklist["df_count"]):
        error = ErrorTypes.INCOMING_DATAFRAME_COUNT_NOT_MATCH_ERROR

    if(len(extra["models"]) not in checklist["model_count"]):
        error = ErrorTypes.INCOMING_MODEL_COUNT_NOT_MATCH_ERROR

    return error, extra