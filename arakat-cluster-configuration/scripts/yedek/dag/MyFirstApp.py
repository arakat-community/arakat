from airflow import DAG
from airflow.contrib.operators.spark_submit_operator import SparkSubmitOperator
from datetime import datetime

dag = DAG("MyFirstApp", default_args={"owner": "airflow", "start_date": datetime.strptime("01/01/2018", "%d/%m/%Y")}, schedule_interval="@once")

operator_args = {'depends_on_past': False, 'conn_id': 'spark_con_py', 'conf': {'spark.pyspark.python': '/usr/bin/python2.7'}}
Task_MyFirstApp_task1 = SparkSubmitOperator(task_id="MyFirstApp_task1", application="/usr/local/spark_code/MyFirstApp_task1.py", dag=dag, **operator_args)


