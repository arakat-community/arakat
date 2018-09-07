from utils import CodeGenerationUtils

import os

# spark_runner_path is relative to the airflow server/cluster such that airflow will use this bash script with BashOperator.

# Maybe later read them from config files...
__set_of_datetime_arguments={"start_date", "end_date"}
__datetime_format="%d/%m/%Y"

# No need to keep data/state, so I did not make it a class..
# This will be safe for multi-thread use as well~

def generate_code(task_nodes, task_edges, args):
    # Add error checks
    errors=[]
    dag_code = __generate_imports()
    dag_code.extend(__instantinate_dag(args["dag_args"]))
    for task_node_id in task_nodes:
        dag_code.append(os.linesep)
        dag_code.extend(__create_bash_operator(task_node_id, args["spark_runner_path"]))
        dag_code.append(os.linesep)

    dag_code.extend([os.linesep, os.linesep])
    for edge in task_edges:
        node_ids=edge.split("-")
        dag_code.append(os.linesep)
        dag_code.append("Task_"+node_ids[1]+".set_upstream("+"Task_"+node_ids[0]+")")
        dag_code.append(os.linesep)

    return dag_code, errors


def __generate_imports():
    import_code=["from airflow import DAG", os.linesep,
                 "from airflow.operators.bash_operator import BashOperator", os.linesep,
                 "from datetime import datetime",os.linesep,os.linesep]
    return import_code

def __instantinate_dag(airflow_args):
    dag_code=['dag = DAG("' + airflow_args["app_id"] + '", default_args=' + __arg_dict_to_string(airflow_args["default_args"]) + ', schedule_interval="' + airflow_args["schedule_interval"] + '")']
    dag_code.append(os.linesep)
    return dag_code

def __create_bash_operator(task_id, spark_runner_path):
    return ['Task_'+task_id+'= BashOperator(task_id="'+task_id+'", bash_command="'+spark_runner_path+' Task_'+task_id+'.py ", dag=dag)']

def __arg_dict_to_string(args):
    # Assuming that corresponding argument is a string which is appropriate for pre-defined datetime format.
    code=["{"]
    for arg in args:
        if(arg in __set_of_datetime_arguments):
            code.extend(['datetime.strptime("' + args[arg] + '", "' + __datetime_format +'")', ","])
        else:
            code.extend([CodeGenerationUtils.arrange_parameter_value(arg), ": ", CodeGenerationUtils.arrange_parameter_value(args[arg]), ","])
    if (len(args) > 0):
        code.pop()
    code.append("}")
    return ''.join(code)