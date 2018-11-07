# docker build -t airflowy .
sudo docker pull arakat/arakat-airflow
sudo docker stack deploy --compose-file=docker-compose-CeleryExecutor.yml airflow


