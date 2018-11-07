#curl -d "command=/spark/bin/spark-submit --master spark://spark-master:7077 /usr/local/spark_code/MyFirstApp3_task1.py&file=MyFirstApp3_task1.py" -X POST http://spark-master:5000/run-spark-job
curl -d "command=$1&file=$2" -X POST http://spark-master:5000/run-spark-job
