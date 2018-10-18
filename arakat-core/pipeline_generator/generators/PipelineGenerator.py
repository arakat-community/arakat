from pprint import pprint

import ScheduleGenerator
import TaskGenerator
from domain.ErrorTypes import ErrorTypes
from pipeline_generator.preprocessing.graph import GraphPreprocessor


# No need to keep data/state, so I did not make it a class..
# This will be safe for multi-thread use as well~

def generate_pipeline(graph, args):
    success=False

    task_nodes, task_edges, error= __parse_graph(graph)
    # Re-consider the following...
    __add_app_id_to_task_nodes(task_nodes, args["app_id"])
    code_info={}
    if(error == ErrorTypes.NO_ERROR):
        task_codes, task_errors = __generate_task_codes(task_nodes)
        scheduler_code, scheduler_errors= ScheduleGenerator.generate_code(task_nodes, task_edges, args)
        print_codes(task_codes, scheduler_code)

        if(not (bool(task_errors) or bool(scheduler_errors))):
            success=True
            code_info[args["app_id"]]={
                "tasks": task_codes,
                "scheduler": ''.join(scheduler_code)
            }

        return code_info, success, {"task_errors": task_errors, "scheduler_errors": scheduler_errors}

    return code_info, success, {"parsing_error": error}

def __add_app_id_to_task_nodes(task_nodes, app_id):
    for task_node_id in task_nodes:
        task_nodes[task_node_id]["app_id"]=app_id

def print_codes(task_codes, scheduler_code):
    print("Scheduler code")
    pprint(''.join(scheduler_code))
    with open("/home/eyanik/ALL/Arakat/Playground/Trials/Test/DAG.py", "w") as text_file:
        text_file.write(''.join(scheduler_code))
    print("--------------------------------------------------------------------")
    for tc in task_codes:
        print("Task_"+tc)
        pprint(task_codes[tc])
        with open("/home/eyanik/ALL/Arakat/Playground/Trials/Test/"+tc+".py", "w") as text_file:
            text_file.write(task_codes[tc])
        print("--------------------------------------------------------------------")

def __generate_task_codes(task_nodes):
    task_codes = {}
    task_errors={}
    for task_node_id in task_nodes:
        task_code, errors = TaskGenerator.generate_code(task_nodes[task_node_id])
        task_codes[task_node_id]=''.join(task_code)
        if(bool(errors)):
            task_errors[task_node_id]=errors

    return task_codes, task_errors

def __parse_graph(graph):
    # {"graph": {"edges":{"nodeId1-nodeId2": {...edge-props...}, ...}, "nodes": {"nodeId1": {...node-specs...}, ...}}}
    # Each node keeps its parent's id as well
    return GraphPreprocessor.preprocess_graph(graph)
