from src.domain import DomainUtils
from src.domain.ErrorTypes import ErrorTypes
from src.domain.HighLevelNodeTypes import HighLevelNodeTypes
import ParentChecker, NodeAdderForTasks, SpecialCaseHandler


# Assume that there are 2 levels of compound nodes:
# 1) Tasks
# 2) Pipeline nodes/CV nodes under task nodes (No more depth)
# Hence, CV nodes can't have pipelines, but estimators only. CV node can have an estimator and evaluator node, connected with an edge!
# When estimator is in CV node, it will also keep grid parameters/info which are obtained from user.
# A task node can't include another task node.
# An edge can only connect siblings (with the same parent)
# May have exceptions

# No need to keep data/state, so I did not make it a class..
# This will be safe for multi-thread use as well~

def preprocess_graph(graph):
    task_nodes={}
    task_edges={}
    special_cases=[]

    for edge_id in graph["edges"]:
        cur_node_ids=edge_id.split("-")
        cur_nodes=[]
        for node_id in cur_node_ids:
            cur_nodes.append(graph["nodes"][node_id])

        parent_info= ParentChecker.check_parents(cur_nodes, graph["edges"][edge_id], graph["nodes"])
        if("special_case" in parent_info):
            special_cases.append(parent_info["special_case"])
        else:
            if(parent_info["error"] != ErrorTypes.NO_ERROR):
                return task_nodes, task_edges, parent_info["error"]

            if(parent_info["parent_type"] == HighLevelNodeTypes.NO_NODE):
                task_edges[edge_id]=graph["edges"][edge_id]
                NodeAdderForTasks.add_task_nodes(cur_nodes, task_nodes)
            elif(DomainUtils.is_compound(parent_info["parent_type"].value)):
                NodeAdderForTasks.add_nodes_of_compounds(edge_id, graph["edges"][edge_id], cur_nodes, parent_info, task_nodes, graph["nodes"])
            elif(parent_info["parent_type"] == HighLevelNodeTypes.TASK_NODE):
                NodeAdderForTasks.add_inner_nodes(edge_id, graph["edges"][edge_id], cur_nodes, parent_info, task_nodes, graph["nodes"])

    __process_special_cases(special_cases, task_nodes)

    return task_nodes, task_edges, ErrorTypes.NO_ERROR

def __process_special_cases(special_cases, task_nodes):
    # Must enter here as the last step of preprocessing...
    # Processing special cases must not depend on previous steps and vice-a-versa
    for case in special_cases:
        SpecialCaseHandler.handle_special_cases(case, task_nodes)
