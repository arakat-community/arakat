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
    'retries': 0,
    'retry_delay': timedelta(minutes=25),
    'schedule_interval':'@once'
}


_config = {
    'conf': {
        'spark.pyspark.python': '/usr/bin/python2.7'
    },
    'total-executor-cores': 1,
    'executor-memory': '2G'   
}

dag = DAG('spark_python', default_args=default_args, max_active_runs=25)
operator = SparkSubmitOperator(
    task_id='spark_submit_job',
    conn_id='spark_con_py',
    application='/usr/local/airflow/paralel.py',
    depends_on_past=False,
    dag=dag,
     **_config
    
)
