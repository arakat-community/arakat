from src.domain.ErrorTypes import ErrorTypes
from src.domain.SpecialCases import SpecialCases


def handle_special_cases(special_case, task_nodes):
    __special_case_handlers[special_case["name"]](special_case, task_nodes)

def __handle_crossing_model_edge_to_pipeline_case(special_case, task_nodes):
    # Assuming that all the nodes and edges referred here exist
    # Hence, you called special_case handler at the end of the preprocessor. Otherwise, you need to manage other nodes here as well. Don't!

    if "model_provider_id" in task_nodes[special_case["task_id"]]["nodes"][special_case["pipeline_id"]]["nodes"][special_case["model_holder_id"]]:
        return {"error": ErrorTypes.MODEL_HOLDER_CAN_HOLD_SINGLE_MODEL_ERROR}

    if("special_edges" not in task_nodes[special_case["task_id"]]):
        task_nodes[special_case["task_id"]]["special_edges"]={}

    if ("pipeline_model_holder_edges" not in task_nodes[special_case["task_id"]]["special_edges"]):
        task_nodes[special_case["task_id"]]["special_edges"]["pipeline_model_holder_edges"] = {}

    new_edge_id=special_case["model_source_id"] + "-" + special_case["pipeline_id"]
    task_nodes[special_case["task_id"]]["special_edges"]["pipeline_model_holder_edges"][new_edge_id]=special_case["edge_info"]
    task_nodes[special_case["task_id"]]["nodes"][special_case["pipeline_id"]]["nodes"][special_case["model_holder_id"]]["model_provider_id"]=special_case["model_source_id"]

    return {"error": ErrorTypes.NO_ERROR}


__special_case_handlers={SpecialCases.CROSSING_MODEL_EDGE_TO_PIPELINE: __handle_crossing_model_edge_to_pipeline_case}