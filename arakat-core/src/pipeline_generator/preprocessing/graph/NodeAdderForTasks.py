from src.domain import DomainUtils

# Rename!

def add_inner_nodes(edge_id, edge_info, cur_nodes, parent_info, task_nodes, graph_nodes):
    task_id = parent_info["parent_id"]
    if (task_id not in task_nodes):
        task_nodes[task_id] = graph_nodes[task_id]
        task_nodes[task_id].update({"nodes": {}, "edges": {}})

    task_nodes[task_id]["edges"][edge_id]=edge_info

    for node in cur_nodes:
        if(DomainUtils.is_compound(node["node_type"])):
            __add_compund_nodes(cur_nodes, task_id, task_nodes)
        else:
            task_nodes[task_id]["nodes"][node["id"]] = node

def __add_compund_nodes(cur_nodes, task_id, task_nodes):
    for node in cur_nodes:
        if(node["id"] not in task_nodes[task_id]["nodes"]):
            task_nodes[task_id]["nodes"][node["id"]]=node
            task_nodes[task_id]["nodes"][node["id"]]["nodes"] = {}
            task_nodes[task_id]["nodes"][node["id"]]["edges"] = {}

def add_task_nodes(cur_nodes, task_nodes):
    for node in cur_nodes:
        if(node["id"] not in task_nodes):
            task_nodes[node["id"]]=node
            task_nodes[node["id"]]["nodes"] = {}
            task_nodes[node["id"]]["edges"] = {}

def add_nodes_of_compounds(edge_id, edge_info, cur_nodes, parent_info, task_nodes, graph_nodes):
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