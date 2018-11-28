from src.domain.ErrorTypes import ErrorTypes
from src.domain.NodeFamilyTypes import NodeFamilyTypes

def check_validity(cv_nodes, cv_edges):
    if(len(cv_edges) != 1 or len(cv_nodes) != 2):
        return ErrorTypes.CV_ELEMENT_COUNT_NOT_MATCH_ERROR, {}

    estimator_node_id=-1
    evaluator_node_id=-1
    for node_id in cv_nodes:
        if(cv_nodes[node_id]["family"] == NodeFamilyTypes.Estimator.value):
            estimator_node_id=node_id
        elif(cv_nodes[node_id]["family"] == NodeFamilyTypes.Evaluator.value):
            evaluator_node_id = node_id
        else:
            return ErrorTypes.INCOMPATIBLE_CV_NODE_ERROR, {}

    if(estimator_node_id==-1):
        return ErrorTypes.NO_ESTIMATOR_PROVIDED_FOR_CV_ERROR, {}
    if (evaluator_node_id==-1):
        return ErrorTypes.NO_EVALUATOR_PROVIDED_FOR_CV_ERROR, {}

    return ErrorTypes.NO_ERROR, {"estimator_node_id": estimator_node_id, "evaluator_node_id": evaluator_node_id}