curl -d "command=/spark/bin/spark-submit --master spark://spark-master:7077 /usr/local/spark_code/$1.py&file=$1" -X POST http://spark-master:5000/run-spark-job
