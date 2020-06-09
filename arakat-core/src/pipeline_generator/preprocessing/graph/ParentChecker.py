from src.domain.ErrorTypes import ErrorTypes
from src.domain.SpecialCases import SpecialCases

from src.domain.HighLevelNodeTypes import HighLevelNodeTypes


def check_parents(cur_nodes, edge_info, nodes):
    parent1 = cur_nodes[0]["parent"]
    parent2 = cur_nodes[1]["parent"]
    # No nodes (except Task nodes) can have a None parent.
    if(parent1 is None and parent2 is None):
        # Edge between task
        return {"parent_type": HighLevelNodeTypes.NO_NODE, "error": ErrorTypes.NO_ERROR}
    elif(parent1 is None and parent2 is not None):
        # Error: since task node cannot be connected with inner nodes (non-task nodes)
        # Error: tasks can't include other tasks as inner nodes
        if(nodes[parent2]["node_type"] == HighLevelNodeTypes.TASK_NODE.value):
            return {"error": ErrorTypes.TASK_INSIDE_TASK_ERROR}
        return {"error": ErrorTypes.TASK_TO_INNER_EDGE_ERROR}
    elif(parent1 is not None and parent2 is None):
        # Error: since task node cannot be connected with inner nodes (non-task nodes)
        # Error: tasks can't include other tasks as inner nodes
        if (nodes[parent1]["node_type"] == HighLevelNodeTypes.TASK_NODE.value):
            return {"error": ErrorTypes.TASK_INSIDE_TASK_ERROR}
        return {"error": ErrorTypes.TASK_TO_INNER_EDGE_ERROR}
    else:
        # Both node have parents.

        # Nodes with an edge must have same parents (No Cross Edges).
        # -> No edges between inner nodes of different tasks
        # -> No edges between inner nodes and nodes under pipeline nodes/cv nodes
        # Determine the parent type: Task Node, Pipeline Node or CV Node...
        # Special nodes:
        # Only allow crossing edges to pipelines from an inner node iff edge carries model

        if(parent1 == parent2):
            # Siblings of same parents, satisfies conditions above...
            # Meta-parent will be used when the parent is pipeline node or cv node.
            return {"parent_id": parent1, "parent_type": HighLevelNodeTypes(nodes[parent1]["node_type"]), "meta_parent_id": nodes[parent1]["parent"], "error": ErrorTypes.NO_ERROR}
        else:
            return __check_special_cases(cur_nodes, edge_info, [nodes[parent1], nodes[parent2]])

def __check_special_cases(cur_nodes, edge_info, parents):
    return __is_model_edge_crossing_into_pipeline(cur_nodes, edge_info, parents)

def __is_model_edge_crossing_into_pipeline(cur_nodes, edge_info, parents):
    if(parents[0]["node_type"] == HighLevelNodeTypes.TASK_NODE.value and parents[1]["node_type"] == HighLevelNodeTypes.PIPELINE_NODE.value):
        if(edge_info["type"]=="model"):
            edge_id=cur_nodes[0]["id"] + "-" + cur_nodes[1]["id"]
            return {"special_case": {"name": SpecialCases.CROSSING_MODEL_EDGE_TO_PIPELINE, "task_id": parents[0]["id"], "pipeline_id": parents[1]["id"], "model_source_id": cur_nodes[0]["id"], "model_holder_id": cur_nodes[1]["id"], "edge_info": edge_info}, "error": ErrorTypes.NO_ERROR}
        else:
            # Might add a better name for the error
            return {"error": ErrorTypes.NOT_SIBLING_ERROR}