sudo docker pull wurstmeister/zookeeper
sudo docker pull wurstmeister/kafka:latest
sudo docker stack deploy --compose-file=docker-compose.yml kafka
