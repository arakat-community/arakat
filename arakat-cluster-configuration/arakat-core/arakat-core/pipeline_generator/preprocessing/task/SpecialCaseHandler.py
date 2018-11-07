def update_dependents_and_requireds_for_special_cases(dependents_info, requireds_info, special_edges):
    if("pipeline_model_holder_edges" in special_edges):
        # These are conceptual edges, only will be used while ordering.
        # Note that an incoming edge to pipeline_model_holder is removed and attached to the pipeline for this special case.
        for edge_id in special_edges["pipeline_model_holder_edges"]:
            cur_node_ids = edge_id.split("-")
            __add_dependents_info(cur_node_ids[0], cur_node_ids[1], dependents_info)
            __add_requireds_info(cur_node_ids[1], cur_node_ids[0], requireds_info)


def __add_dependents_info(current_node_id, dependent_node_id, dependents_info):
    if (current_node_id not in dependents_info):
        dependents_info[current_node_id] = set()

    dependents_info[current_node_id].add(dependent_node_id)

def __add_requireds_info(current_node_id, required_node_id, requireds_info):
    if (current_node_id not in requireds_info):
        requireds_info[current_node_id] = set()

    requireds_info[current_node_id].add(required_node_id)