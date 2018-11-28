from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from datetime import datetime

dag = DAG("Demo_MainExample", default_args={"owner": "airflow", "start_date": datetime.strptime("01/01/2018", "%d/%m/%Y")}, schedule_interval="@once")

Task_Demo_MainExample_task1 = BashOperator(task_id="Demo_MainExample_task1", bash_command='sh /usr/local/shell_scripts/run.sh "Demo_MainExample_task1" ', dag=dag)

Task_Demo_MainExample_task2 = BashOperator(task_id="Demo_MainExample_task2", bash_command='sh /usr/local/shell_scripts/run.sh "Demo_MainExample_task2" ', dag=dag)

Task_Demo_MainExample_task3 = BashOperator(task_id="Demo_MainExample_task3", bash_command='sh /usr/local/shell_scripts/run.sh "Demo_MainExample_task3" ', dag=dag)


Task_Demo_MainExample_task2.set_upstream(Task_Demo_MainExample_task1)

Task_Demo_MainExample_task3.set_upstream(Task_Demo_MainExample_task2)
