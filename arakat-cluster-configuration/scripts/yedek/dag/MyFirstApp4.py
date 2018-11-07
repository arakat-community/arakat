from airflow import DAG
from airflow.contrib.operators.spark_submit_operator import SparkSubmitOperator
from datetime import datetime

dag = DAG("MyFirstApp4", default_args={"owner": "airflow", "start_date": datetime.strptime("01/01/2018", "%d/%m/%Y")}, schedule_interval="@once")

operator_args = {'depends_on_past': False, 'conn_id': 'spark_con_py', 'conf': {'spark.pyspark.python': '/usr/bin/python2.7'}}
Task_MyFirstApp4_task1 = SparkSubmitOperator(task_id="MyFirstApp4_task1", application="/usr/local/spark_code/MyFirstApp4_task1.py", dag=dag, **operator_args)

operator_args = {'depends_on_past': False, 'conn_id': 'spark_con_py', 'conf': {'spark.pyspark.python': '/usr/bin/python2.7'}}
Task_MyFirstApp4_task2 = SparkSubmitOperator(task_id="MyFirstApp4_task2", application="/usr/local/spark_code/MyFirstApp4_task2.py", dag=dag, **operator_args)



Task_MyFirstApp4_task2.set_upstream(Task_MyFirstApp4_task1)
