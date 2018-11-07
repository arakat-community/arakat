FROM bde2020/spark-master:2.3.2-hadoop2.8

RUN apt-get update && apt-get install -yq --no-install-recommends nano

RUN apt-get update && apt-get install -y python-pip

RUN easy_install pip

ENV PATH="/spark/bin:${PATH}"

COPY requirements.txt /

RUN pip install -r /requirements.txt 

COPY SparkOperator.py /

COPY master.sh /

RUN mkdir /spark_logs

EXPOSE 5000 8080 7077 6066

#ENTRYPOINT spark-submit /HdfsReader.py
CMD ["/bin/bash", "/master.sh"]
#CMD /master.sh && /spark/bin/submit /SparkOperator.py

