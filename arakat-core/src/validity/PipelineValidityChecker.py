from src.domain.ErrorTypes import ErrorTypes
from src.domain.NodeFamilyTypes import NodeFamilyTypes

from src.domain import DomainUtils


def check_validity(pipeline_nodes, pipeline_edges):

    if(len(pipeline_nodes)==0):
        return ErrorTypes.NO_NODE_IN_PIPELINE_ERROR, []

    for node_id in pipeline_nodes:
        if(not pipeline_nodes[node_id]["compatible_with_spark_pipeline"]):
            return ErrorTypes.INCOMPATIBLE_PIPELINE_NODE, []

    dependents={}
    with_no_reqs = set(pipeline_nodes.keys())
    for edge_id in pipeline_edges:
        if(pipeline_edges[edge_id]["type"] != "pipeline"):
            return ErrorTypes.NOT_COMPATIBLE_EDGE_WITH_PIPELINE_ERROR, []

        cur_node_ids=edge_id.split("-")
        dependents[cur_node_ids[0]]=cur_node_ids[1]
        if(cur_node_ids[1] in with_no_reqs):
            with_no_reqs.remove(cur_node_ids[1])
        else:
            # Only handles multiple incoming edges case...
            return ErrorTypes.NON_LINEAR_PIPELINE_ERROR, []

    if(len(with_no_reqs) != 1):
        return ErrorTypes.REQUIRES_EXACTLY_ONE_ENTRANCE_NODE_ERROR

    if(len(dependents) != (len(pipeline_nodes) - 1)):
        # If not match, it means that there are splits in pipeline
        # This completes the non-linear pipeline check
        return ErrorTypes.NON_LINEAR_PIPELINE_ERROR, []

    cur_node_id=list(with_no_reqs)[0]
    pipeline_order=[]
    # We can now sort the ids for linear pipeline...
    while(bool(dependents)):
        pipeline_order.append(cur_node_id)
        temp=cur_node_id
        cur_node_id=dependents[cur_node_id]
        del dependents[temp]

    pipeline_order.append(cur_node_id)

    for elem in pipeline_order:
        cur_family=pipeline_nodes[elem]["family"]
        if(not (cur_family == NodeFamilyTypes.Transformer.value or cur_family == NodeFamilyTypes.Estimator.value or DomainUtils.has_privilage_for_pipeline(pipeline_nodes[elem]["node_id"]))):
            return ErrorTypes.NOT_COMPATIBLE_NODES_IN_PIPELINE_ERROR, []

    return ErrorTypes.NO_ERROR, pipeline_order