import os
from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta
from airflow.contrib.operators.ssh_operator import SSHOperator
from airflow.contrib.operators.spark_submit_operator import SparkSubmitOperator

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2018, 10, 3),
    'email': ['airflow@airflow.com'],
    'retries': 1,
    'retry_delay': timedelta(minutes=25),
    'schedule_interval':'@once'
}

dag = DAG('spark', default_args=default_args)
operator = SparkSubmitOperator(
    task_id='spark_submit_job',
    conn_id='spark_con_scala',
    java_class='Main',
    application='/root/code/SimpleSpark.jar',
    dag=dag
)
