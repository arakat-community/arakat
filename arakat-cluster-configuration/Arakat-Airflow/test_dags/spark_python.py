import os
from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta
from airflow.contrib.operators.ssh_operator import SSHOperator
from airflow.contrib.operators.spark_submit_operator import SparkSubmitOperator


dag = DAG("MyFirstApp", default_args={"owner": "airflow",datetime.strptime("01/01/2018", "%d/%m/%Y"),datetime.strptime("02/01/2018", "%d/%m/%Y")}, schedule_interval="@once")

operator = SparkSubmitOperator(
    task_id='spark_submit_job',
    conn_id='spark_con_py',
    application='/usr/local/paralel.py',
    dag=dag
)
