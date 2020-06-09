import os

from src.utils.code_generation import CodeGenerationUtils

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
    dag_code.extend(__instantinate_dag(args))
    for task_node_id in task_nodes:
        dag_code.append(os.linesep)
        # dag_code.extend(__create_spark_operator(task_node_id, args))
        dag_code.extend(__create_bash_operator(task_node_id, args))
        dag_code.append(os.linesep)

    dag_code.extend([os.linesep])
    for edge in task_edges:
        node_ids=edge.split("-")
        dag_code.append(os.linesep)
        dag_code.append("Task_"+ args["app_id"] + "_" + node_ids[1]+".set_upstream("+"Task_"+ args["app_id"]+"_"+node_ids[0]+")")
        dag_code.append(os.linesep)

    return dag_code, errors


def __generate_imports():
    import_code=["from airflow import DAG", os.linesep,
                 "from airflow.operators.bash_operator import BashOperator", os.linesep,
                 "from datetime import datetime",os.linesep,os.linesep]
    return import_code

def __instantinate_dag(args):
    dag_code=['dag = DAG("' + args["app_id"] + '", default_args=' + __arg_dict_to_string(args["default_args"]) + ', schedule_interval="' + args["schedule_interval"] + '")']
    dag_code.append(os.linesep)
    return dag_code

def __create_bash_operator(task_id, args):
    op_task_id = args["app_id"] + "_" + task_id
    return ['Task_' + op_task_id + ' = BashOperator(task_id=' + CodeGenerationUtils.handle_primitive(op_task_id) + ", bash_command='" + args["bash_command"] + ' ' + CodeGenerationUtils.handle_primitive(op_task_id) + " ', dag=dag)"]

# def __create_spark_operator(task_id, args):
#     op_task_id=args["app_id"] + "_" + task_id
#     op_name='Task_'+op_task_id
#     operator_args_str=str(args["spark_operator_conf"])
#     script_path=os.path.join(args["code_base_path"], op_task_id + '.py')
#     return ["operator_args = " + operator_args_str, os.linesep, op_name + ' = SparkSubmitOperator(task_id='+CodeGenerationUtils.handle_primitive(op_task_id)+', application='+CodeGenerationUtils.handle_primitive(script_path)+', dag=dag, **operator_args)']

def __arg_dict_to_string(args):
    # Assuming that corresponding argument is a string which is appropriate for pre-defined datetime format.
    code=["{"]
    for arg in args:
        if(arg in __set_of_datetime_arguments):
            code.extend([CodeGenerationUtils.handle_primitive(arg), ": ", 'datetime.strptime("' + args[arg] + '", "' + __datetime_format + '")', ", "])
        else:
            code.extend([CodeGenerationUtils.handle_primitive(arg), ": ", CodeGenerationUtils.handle_primitive(args[arg]), ", "])
    if (len(args) > 0):
        code.pop()
    code.append("}")
    return ''.join(code)