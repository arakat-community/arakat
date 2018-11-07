import os
from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta
from airflow.contrib.operators.ssh_operator import SSHOperator

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2018, 10, 3),
    'email': ['airflow@airflow.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
    'schedule_interval':'@once'
}

dag = DAG('ssh_test_3_2', default_args=default_args)
t2 =  SSHOperator(task_id='task_one', ssh_conn_id='ssh_default', remote_host='spark-master', command='ls /spark/', dag=dag)
#t3 =  SSHOperator(task_id='task_two', ssh_conn_id='ssh_default', remote_host='spark-master', command='touch /root/ugur/test.txt', dag=dag)
#t3 >> t2
