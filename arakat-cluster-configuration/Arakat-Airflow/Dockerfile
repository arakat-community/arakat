FROM python:3.6-slim
LABEL maintainer="Puckel_"

# Never prompts the user for choices on installation/configuration of packages
ENV DEBIAN_FRONTEND noninteractive
ENV TERM linux

# Airflow
ARG AIRFLOW_VERSION=1.10.0
ARG AIRFLOW_HOME=/usr/local/airflow
ENV AIRFLOW_GPL_UNIDECODE yes

# Define en_US.
ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV LC_CTYPE en_US.UTF-8
ENV LC_MESSAGES en_US.UTF-8

RUN set -ex \
    && buildDeps=' \
        python3-dev \
        libkrb5-dev \
        libsasl2-dev \
        libssl-dev \
        libffi-dev \
        libblas-dev \
        liblapack-dev \
        libpq-dev \
        git \
    ' \
    && apt-get update -yqq \
    && apt-get upgrade -yqq \
    && apt-get install -yqq --no-install-recommends \
        $buildDeps \
        build-essential \
        python3-pip \
        python3-requests \
        mysql-client \
        mysql-server \
        default-libmysqlclient-dev \
        apt-utils \
        curl \
        rsync \
        netcat \
        locales \
    && sed -i 's/^# en_US.UTF-8 UTF-8$/en_US.UTF-8 UTF-8/g' /etc/locale.gen \
    && locale-gen \
    && update-locale LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
    && useradd -ms /bin/bash -d ${AIRFLOW_HOME} airflow \
    && pip install -U pip setuptools wheel \
    && pip install Cython \
    && pip install pytz \
    && pip install pyOpenSSL \
    && pip install ndg-httpsclient \
    && pip install pyasn1 \
    && pip install apache-airflow[crypto,celery,postgres,hive,jdbc,mysql,ssh]==$AIRFLOW_VERSION \
    && pip install 'celery[redis]>=4.1.1,<4.2.0' \
    && apt-get purge --auto-remove -yqq $buildDeps \
    && apt-get autoremove -yqq --purge \
    && apt-get clean \
    && rm -rf \
        /var/lib/apt/lists/* \
        /tmp/* \
        /var/tmp/* \
        /usr/share/man \
        /usr/share/doc \
        /usr/share/doc-base


RUN mkdir -p /usr/share/man/man1
RUN apt-get update
RUN apt-get install -yq --no-install-recommends default-jdk
RUN apt-get install -yq --no-install-recommends scala
RUN apt-get install -yq --no-install-recommends sshpass
RUN apt-get install -yq --no-install-recommends wget
RUN wget https://archive.apache.org/dist/spark/spark-2.3.2/spark-2.3.2-bin-hadoop2.7.tgz
RUN tar xvf spark-2.3.2-bin-hadoop2.7.tgz
RUN mv spark-2.3.2-bin-hadoop2.7 spark
RUN rm spark-2.3.2-bin-hadoop2.7.tgz
RUN apt-get install -yq --no-install-recommends python2.7
RUN export PYSPARK_PYTHON=/usr/local/lib/python2.7

COPY hadoop-2.8.0.tar.gz  /hadoop-2.8.0.tar.gz
RUN tar -zxvf hadoop-2.8.0.tar.gz

COPY docker-java-home.tar.gz  /docker-java-home.tar.gz
RUN tar -zxvf docker-java-home.tar.gz

ENV PATH="/hadoop-2.8.0/bin:${PATH}"
ENV JAVA_HOME=/docker-java-home
COPY script/spark-env.sh /spark/conf/
COPY script/entrypoint.sh /entrypoint.sh
COPY config/airflow.cfg ${AIRFLOW_HOME}/airflow.cfg

RUN apt-get install -yq --no-install-recommends python-pip
#RUN /usr/bin/python2.7 -m /usr/bin/pip install numpy

# RUN apt-get install -yq --no-install-recommends virtualenv
# RUN mkdir /usr/local/airflow/venv
# RUN virtualenv --python=python2.7 /usr/local/airflow/venv/
# RUN source /usr/local/airflow/venv/bin/active
RUN chown -R airflow: ${AIRFLOW_HOME}

EXPOSE 8080 5555 8793
RUN echo "root:123" | chpasswd
USER airflow

WORKDIR ${AIRFLOW_HOME}

ENTRYPOINT ["/entrypoint.sh"]
CMD ["webserver"] # set default arg for entrypoint

