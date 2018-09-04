from domain.HighLevelNodeTypes import HighLevelNodeTypes
from domain.ErrorTypes import ErrorTypes
from domain import DomainUtils
# Assume that there are 2 levels of compound nodes:
# 1) Tasks
# 2) Pipeline nodes/CV nodes under task nodes (No more depth)
# Hence, CV nodes can't have pipelines, but estimators only. CV node can have an estimator and evaluator node, connected with an edge!
# When estimator is in CV node, it will also keep grid parameters/info which are obtained from user.
# A task node can't include another task node.
# An edge can only connect siblings (with the same parent)

# No need to keep data/state, so I did not make it a class..
# This will be safe for multi-thread use as well~

# Re-write a clear version...

def preprocess_graph(graph):
    task_nodes={}
    task_edges={}

    for edge_id in graph["edges"]:
        cur_node_ids=edge_id.split("-")
        cur_nodes=[]
        for node_id in cur_node_ids:
            cur_nodes.append(graph["nodes"][node_id])

        parent_info=__check_parents(cur_nodes, graph["nodes"])
        if(parent_info["error"] != ErrorTypes.NO_ERROR):
            return task_nodes, task_edges, parent_info["error"]

        if(parent_info["parent_type"] == HighLevelNodeTypes.NO_NODE):
            task_edges[edge_id]=graph["edges"][edge_id]
            __add_task_nodes(cur_nodes, task_nodes)
        elif(DomainUtils.is_compound(parent_info["parent_type"].value)):
            __add_nodes_of_compounds(edge_id, graph["edges"][edge_id], cur_nodes, parent_info, task_nodes, graph["nodes"])
        elif(parent_info["parent_type"] == HighLevelNodeTypes.TASK_NODE):
            __add_inner_nodes(edge_id, graph["edges"][edge_id], cur_nodes, parent_info, task_nodes, graph["nodes"])

    return task_nodes, task_edges, ErrorTypes.NO_ERROR

def __add_inner_nodes(edge_id, edge_info, cur_nodes, parent_info, task_nodes, graph_nodes):
    task_id = parent_info["parent_id"]
    if (task_id not in task_nodes):
        task_nodes[task_id] = graph_nodes[task_id]
        task_nodes[task_id].update({"nodes": {}, "edges": {}})

    task_nodes[task_id]["edges"][edge_id]=edge_info

    for node in cur_nodes:
        if(DomainUtils.is_compound(node["node_type"])):
            add_compund_nodes(cur_nodes, task_id, task_nodes)
        else:
            task_nodes[task_id]["nodes"][node["id"]] = node

def add_compund_nodes(cur_nodes, task_id, task_nodes):
    for node in cur_nodes:
        if(node["id"] not in task_nodes[task_id]["nodes"]):
            task_nodes[task_id]["nodes"][node["id"]]=node
            task_nodes[task_id]["nodes"][node["id"]]["nodes"] = {}
            task_nodes[task_id]["nodes"][node["id"]]["edges"] = {}

def __add_task_nodes(cur_nodes, task_nodes):
    for node in cur_nodes:
        if(node["id"] not in task_nodes):
            task_nodes[node["id"]]=node
            task_nodes[node["id"]]["nodes"] = {}
            task_nodes[node["id"]]["edges"] = {}

def __add_nodes_of_compounds(edge_id, edge_info, cur_nodes, parent_info, task_nodes, graph_nodes):
    compound_id=parent_info["parent_id"]
    task_id=parent_info["meta_parent_id"]

    if (task_id not in task_nodes):
        task_nodes[task_id] = graph_nodes[task_id]
        task_nodes[task_id].update({"nodes": {}, "edges": {}})

    if (compound_id not in task_nodes[task_id]["nodes"]):
        task_nodes[task_id]["nodes"][compound_id] = graph_nodes[compound_id]
        task_nodes[task_id]["nodes"][compound_id].update({"nodes": {}, "edges": {}})

    task_nodes[task_id]["nodes"][compound_id]["edges"][edge_id]=edge_info

    for node in cur_nodes:
        task_nodes[task_id]["nodes"][compound_id]["nodes"][node["id"]] = node


def __check_parents(cur_nodes, nodes):
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

        if(parent1 == parent2):
            # Siblings of same parents, satisfies conditions above...
            # Meta-parent will be used when the parent is pipeline node or cv node.
            return {"parent_id": parent1, "parent_type": HighLevelNodeTypes(nodes[parent1]["node_type"]), "meta_parent_id": nodes[parent1]["parent"], "error": ErrorTypes.NO_ERROR}
        else:
            return {"error": ErrorTypes.NOT_SIBLING_ERROR}