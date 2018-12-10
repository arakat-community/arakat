from pprint import pprint

import ScheduleGenerator
import TaskGenerator
from src.domain.ErrorTypes import ErrorTypes
from src.pipeline_generator.preprocessing.graph import GraphPreprocessor


# No need to keep data/state, so I did not make it a class..
# This will be safe for multi-thread use as well~

def generate_pipeline(graph, args):
    success=False

    task_nodes, task_edges, error= __parse_graph(graph)
    # Re-consider the following...
    __add_app_id_to_task_nodes(task_nodes, args["app_id"])
    code_info={}
    if(error == ErrorTypes.NO_ERROR):
        task_codes, task_errors, additional_info = __generate_task_codes(task_nodes,  args["app_id"])
        scheduler_code, scheduler_errors= ScheduleGenerator.generate_code(task_nodes, task_edges, args)

        #print_codes(args["app_id"], task_codes, scheduler_code, "debug_path")

        if(not (bool(task_errors) or bool(scheduler_errors))):
            success=True
            code_info[args["app_id"]]={
                "tasks": task_codes,
                "scheduler": ''.join(scheduler_code)
            }

        return code_info, success, {"task_errors": task_errors, "scheduler_errors": scheduler_errors}, additional_info

    return code_info, success, {"parsing_error": error}, {}

def __add_app_id_to_task_nodes(task_nodes, app_id):
    for task_node_id in task_nodes:
        task_nodes[task_node_id]["app_id"]=app_id

def print_codes(app_id, task_codes, scheduler_code, fpath):
    print("Scheduler code")
    pprint(''.join(scheduler_code))
    import os
    with open(os.path.join(fpath, "DAG.py"), "w") as text_file:
        text_file.write(''.join(scheduler_code))
    print("--------------------------------------------------------------------")
    for tc in task_codes:
        print("Task_"+tc)
        pprint(task_codes[tc])
        with open(os.path.join(fpath, app_id+"_"+tc+".py", "w")) as text_file:
            text_file.write(task_codes[tc])
        print("--------------------------------------------------------------------")

def __generate_task_codes(task_nodes, app_id):
    task_codes = {}
    task_errors={}
    additional_info={}
    for task_node_id in task_nodes:
        task_code, errors, additional_info_for_task = TaskGenerator.generate_code(task_nodes[task_node_id])
        task_codes[task_node_id]=''.join(task_code)
        for elem in additional_info_for_task:
            if(elem not in additional_info):
                additional_info[elem]={app_id:{}}
            additional_info[elem][app_id][task_node_id]=additional_info_for_task[elem]

        if(bool(errors)):
            task_errors[task_node_id]=errors

    return task_codes, task_errors, additional_info

def __parse_graph(graph):
    # {"graph": {"edges":{"nodeId1-nodeId2": {...edge-props...}, ...}, "nodes": {"nodeId1": {...node-specs...}, ...}}}
    # Each node keeps its parent's id as well
    return GraphPreprocessor.preprocess_graph(graph)
