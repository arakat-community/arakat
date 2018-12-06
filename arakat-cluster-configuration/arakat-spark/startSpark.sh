docker pull arakat/arakat-spark-master
docker pull bde2020/spark-worker:2.3.2-hadoop2.8
docker pull bde2020/hadoop-namenode:2.0.0-hadoop2.7.4-java8
docker pull bde2020/hadoop-datanode:2.0.0-hadoop2.7.4-java8
sudo docker stack deploy --compose-file=docker-compose-hadoop.yml hadoop
sudo docker stack deploy --compose-file=docker-compose-spark.yml spark

