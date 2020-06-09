import copy
import os

from src.domain import DomainUtils
from src.domain import ImportInfo
from src.domain.ErrorTypes import ErrorTypes
from src.pipeline_generator.preprocessing.task import TaskPreprocessor
from src.utils import GeneralUtils
from src.utils.code_generation import SharedFunctionStore


# No need to keep data/state, so I did not make it a class..
# This will be safe for multi-thread use as well~

def generate_code(graph):
    # Get task_args from task node itself
    dependents_info, requireds_info, waiting_queue = TaskPreprocessor.preprocess_graph(graph)
    special_edges=None
    if("special_edges" in graph):
        special_edges=graph["special_edges"]
    requireds_info_clone=copy.deepcopy(requireds_info)
    generation_order, error_code = TaskPreprocessor.determine_generation_order(dependents_info, requireds_info_clone, waiting_queue, special_edges)
    # I do not want anyone to refer to these variables after ordering... Since they don't have the data they are ment to anymore...
    del dependents_info
    del requireds_info_clone

    task_code = []
    errors=[]
    additional_info={}
    if(error_code == ErrorTypes.NO_ERROR):
        task_code.extend(__generate_initialization_codes(graph))
        # task_code.append(os.linesep)

        main_code, shared_function_set, errors, additional_info = __generate_remaining_codes(generation_order, requireds_info, graph)
        code_for_shared_functions = __generate_shared_functions_code(shared_function_set)

        task_code.extend(code_for_shared_functions)
        task_code.append(os.linesep)
        task_code.extend(main_code)

    return task_code, errors, additional_info

def __generate_initialization_codes(graph):
    # graph is the task node itself

    initialization_code=["from pyspark import SparkContext", os.linesep, "from pyspark.sql import SparkSession", os.linesep]
    # Maybe improve the following in the future...
    initialization_code.extend(["from pyspark import SQLContext", os.linesep])
    initialization_code.extend(["from pyspark.sql.types import *", os.linesep])
    initialization_code.extend(["import pyspark.sql.functions as F", os.linesep])
    initialization_code.extend(["from pyspark.sql.functions import col, size, from_json, to_json, window, udf, lag, date_add, explode, lit, concat, unix_timestamp, sum, abs", os.linesep])


    import_set=set()
    for node_id in graph["nodes"]:
        import_statements_for_node= ImportInfo.get_import_statements(graph["nodes"][node_id])
        for elem in import_statements_for_node:
            import_set.add(elem)

    for statement in import_set:
        initialization_code.extend([statement, os.linesep])

    initialization_code.append(os.linesep)

    initialization_code.extend(['sc = SparkContext(appName="'+graph["app_id"] + '_Task_' + graph["id"] + '")', os.linesep])
    initialization_code.extend(['spark = SparkSession(sc)', os.linesep])

    return initialization_code

def __generate_shared_functions_code(shared_func_set):
    code=[]
    for func in shared_func_set:
        code.extend(SharedFunctionStore.get_code_for_function(func))
        code.append(os.linesep)
    return code

def __generate_remaining_codes(generation_order, requireds_info, graph):
    code=[]
    shared_function_set=set()
    additional_info={"written_tables": [], "written_topics": []}
    errors=[]
    for elem in generation_order:
        cur_code, shared_functions, error = GeneralUtils.call_function_by_name("src.pipeline_generator.family_base." + DomainUtils.get_node_family_name(graph["nodes"][elem]["family"]), "generate_code", {"node": graph["nodes"][elem], "requireds_info": requireds_info, "edges": graph["edges"], "additional_info": additional_info})
        if(error == ErrorTypes.NO_ERROR):
            code.extend(cur_code)
            shared_function_set.update(shared_functions)
        else:
            errors.append(error)

    # Do not break to capture all errors...
    return code, shared_function_set, errors, additional_info