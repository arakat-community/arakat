from airflow import DAG
from airflow.contrib.operators.ssh_operator import SSHHook, SSHOperator

from datetime import timedelta, datetime


pub_sub_dag = DAG(dag_id="pub-sub-spamer",
                  description="Publish data to Pub/Sub",
                  schedule_interval=timedelta(seconds=15),
                  start_date=datetime(2018, 10, 1))


ssh_hook_instance_1 = SSHHook(ssh_conn_id="ssh_defalut",
                   username="root",
                   remote_host="spark-master")

#ssh_command = "cd gcplay && export PYTHONPATH=${PYTHONPATH}:./gcplay " \
#              "&& env/bin/python gcplay/gcplay/publisher.py"

ssh_command = "ls /"

ssh_task = SSHOperator(dag=pub_sub_dag,
                       ssh_hook=ssh_hook_instance_1,
                       command=ssh_command,
                       ssh_conn_id="ssh_default",
                       task_id="run_publisher",
                       schedule_interval="once")
