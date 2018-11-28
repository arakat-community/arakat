from Queue import Queue

from src.domain import DomainUtils
from src.domain.ErrorTypes import ErrorTypes
from src.pipeline_generator.preprocessing.task import SpecialCaseHandler


# No need to keep data/state, so I did not make it a class..
# This will be safe for multi-thread use as well~

# Improve this...
def determine_generation_order(dependents_info, requireds_info, waiting_queue, special_edges):
    error_code = ErrorTypes.NO_ERROR

    if(special_edges is not None):
        # Pass waiting queue in case any special cases needs to update it...
        SpecialCaseHandler.update_dependents_and_requireds_for_special_cases(dependents_info, requireds_info, special_edges)

    generation_order=[]

    added_nodes=set()
    # At this point, waiting queue has data-source and ModelLoad nodes.
    while(not waiting_queue.empty()):
        cur_node=waiting_queue.get()
        if(cur_node not in added_nodes):
            if((cur_node not in requireds_info) or (not bool(requireds_info[cur_node]))):
                generation_order.append(cur_node)
                added_nodes.add(cur_node)
                __safe_delete(requireds_info, cur_node)
                if(cur_node in dependents_info):
                    for dependent in dependents_info[cur_node]:
                        requireds_info[dependent].remove(cur_node)
                        waiting_queue.put(dependent)
                    __safe_delete(dependents_info, cur_node)

    if(bool(requireds_info)):
        # There must be a cycle if required_info still has elements at this moment
        error_code = ErrorTypes.CYCLE_IN_GRAPH_ERROR

    if(not bool(generation_order)):
        error_code=ErrorTypes.EMPTY_GRAPH_ERROR

    return generation_order, error_code

def preprocess_graph(graph):
    dependents_info = {}
    requireds_info = {}
    waiting_queue = Queue()

    for edge_id in graph["edges"]:
        # Assuming directed edges such that first node is the source and the second node is the target.
        node_ids = edge_id.split("-")
        source_node_family = graph["nodes"][node_ids[0]]["family"]

        __add_dependents_info(node_ids[0], node_ids[1], dependents_info)
        __add_requireds_info(node_ids[1], node_ids[0], requireds_info)

        # Nodes without incoming edges (requireds) will be processed first...
        if(not DomainUtils.requires_incoming_edge(source_node_family)):
            waiting_queue.put(node_ids[0])

    return dependents_info, requireds_info, waiting_queue

def __add_dependents_info(current_node_id, dependent_node_id, dependents_info):
    if (current_node_id not in dependents_info):
        dependents_info[current_node_id] = set()

    dependents_info[current_node_id].add(dependent_node_id)

def __add_requireds_info(current_node_id, required_node_id, requireds_info):
    if (current_node_id not in requireds_info):
        requireds_info[current_node_id] = set()

    requireds_info[current_node_id].add(required_node_id)

def __safe_delete(dict, val):
    if(val in dict):
        del dict[val]