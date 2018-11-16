docker swarm init --advertise-addr 127.0.0.1
docker network create -d overlay arakatnetwork
cd arakat-core
./startCore.sh
cd ..
cd arakat-backend
./startBackend.sh
cd ..
cd arakat-spark
./startSpark.sh
cd ..
cd arakat-kafka
./startKafka.sh
cd ..
cd arakat-airflow
./startAirflow.sh
