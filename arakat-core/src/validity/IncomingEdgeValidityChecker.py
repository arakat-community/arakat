from src.domain.ErrorTypes import ErrorTypes

def check_validity(node_id, requireds_info, edges, checklist):
    # Assuming that there is no order among incoming edges.
    # In such a case, keep extra info in edges.

    error=ErrorTypes.NO_ERROR
    extra={"models":[], "dfs":[]}

    if(node_id in requireds_info):
        for req in requireds_info[node_id]:
            # Maybe make this immutable in the future...

            edge = edges[req + "-" + node_id]

            edge["source_id"]=req
            if("order" not in edge):
                edge["order"]=0

            if(edge["type"]=="dataframe"):
                extra["dfs"].append(edge)
            elif(edge["type"]=="model"):
                extra["models"].append(edge)
            else:
                error=ErrorTypes.UNDEFINED_EDGE_ERROR

        if(len(extra["dfs"]) > 1):
            extra["dfs"].sort(key=lambda x: x["order"])
        if(len(extra["models"]) > 1):
            extra["models"].sort(key=lambda x: x["order"])

    if(len(extra["dfs"]) not in checklist["df_count"]):
        error = ErrorTypes.INCOMING_DATAFRAME_COUNT_NOT_MATCH_ERROR

    if(len(extra["models"]) not in checklist["model_count"]):
        error = ErrorTypes.INCOMING_MODEL_COUNT_NOT_MATCH_ERROR

    return error, extra