from pyspark.sql import SparkSession
from pyspark import SparkContext

sc = SparkContext(appName="BridgeService")
spark = SparkSession(sc)

from flask import Flask
from flask import request
import json
import subprocess
import os
from flask_cors import CORS

from flask import jsonify
app = Flask(__name__)


@app.route('/get-files-from-hdfs',methods=['POST'])
def getFilesFromHDFS():
    try:
       print(request.form['path'])
       os.system("hdfs dfs -get "+ request.form['path']+" ./hdfs-file/")
       return "True"
    except:
       return "False"


def getHDFSContentParquet(path):
    df= spark.read.format("parquet").load(path)
    return df

def getHDFSContentCSV(path):
    df = spark.read.format("csv").load(path, quote="\"", header=True, inferSchema=True, sep=',')
    return df

def getHDFSContentORC(path):
    df = spark.read.format("orc").load(path)
    return df

def readData(file):
    length = len(file.split('.'))
    fileType = file.split('.')[length - 1]
    if fileType=="parquet":
        return getHDFSContentParquet(file)
    elif fileType=="orc":
        return getHDFSContentORC(file)
    elif fileType=="csv":
        return getHDFSContentCSV(file)



@app.route('/get-table-columns',methods=['POST'])
def getTableColumns():
    file = request.form["file"]
    content = readData(file)
    return json.dumps(content.columns)


#@app.route('/get-table-columns-with-types',methods=['POST'])
#def getTableColumnsWithTypes():
#    file = request.form["file"]
#    content = readData(file)
    #print(content.schema.fields)
#    return json.dumps(content.dtypes)

@app.route('/get-table-columns-with-types',methods=['POST'])
def getTableColumnsWithTypes():
    file = request.form["file"]
    content = readData(file)
    typeList = content.dtypes
    dict={}
    headers=["column","column-type"]
    index=1
    for type in typeList:
        map={}
        i=0
        for header in headers:
            map[header]=type[i]
            i=i+1
        dict["col_"+str(index)]=map
        index = index+1

    return json.dumps(dict)

@app.route('/test',methods=['GET'])
def test():
    df = readData("/example3/test.parquet")
    filteredRdd = df.limit(2).collect()
    return json.dumps(filteredRdd)

@app.route('/get-data',methods=['POST'])
def getData():
    query = request.form["query"]
    table = request.form["table"]
    file = request.form["path"]
    selectItem = request.form["selectItem"].split(",")
    content = readData(file)
    content.createOrReplaceTempView(table)
    res = spark.sql(query).collect()
    data = {}
    i=0
    for item in res:
        subData={}
        index = 0
        for subItem in item:
            subData[selectItem[index]] = subItem
            index = index+1
        data["row_" + str(i + 1)] = subData
        i = i + 1
    return jsonify(results = data)


def run_command(command):
    p = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    return iter(p.stdout.readline, b'')


@app.route('/run-spark-job',methods=['POST'])
def runSparkJob():
    try:
       command = request.form['command'].split()
       fileName=request.form['file']
       fileName = "log_"+fileName[0:len(fileName)-3]
       file = open("/spark_logs/"+fileName, "w")
       for line in run_command(command):
           file.write(line)
       file.close()
       return "True"
    except:
       return "False"

app.run(host="0.0.0.0", port=5000)
