curl -d "path=/spark/bin/spark-submit --master spark://spark-master:7077 test.py" -X POST http://spark-master:5000/run-spark-job
