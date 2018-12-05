FROM bde2020/spark-master:2.3.2-hadoop2.8

RUN apt-get update && apt-get install -y python-pip && apt-get install -y kafkacat

ENV PATH="/spark/bin:${PATH}"

COPY requirements.txt /

RUN pip install -r /requirements.txt 

COPY SparkOperator.py /
COPY master.sh /
COPY script.py /

RUN mkdir /spark_logs

EXPOSE 5000 8080 7077 6066

CMD ["/bin/bash", "/master.sh"]
