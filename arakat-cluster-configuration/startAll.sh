docker swarm init --advertise-addr 127.0.0.1
docker network create -d overlay arakatnetwork
cd Arakat-Core
./startCore.sh
cd ..
cd Arakat-Backend
./startBackend.sh
cd ..
cd Arakat-Spark
./startSpark.sh
cd ..
cd Arakat-Kafka
./startKafka.sh
cd ..
cd Arakat-Airflow
./startAirflow.sh
