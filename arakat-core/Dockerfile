FROM python:2.7-alpine

COPY ./ /app
WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT python server_runner.py src.service.CoreService run_my_server 0.0.0.0 5000
