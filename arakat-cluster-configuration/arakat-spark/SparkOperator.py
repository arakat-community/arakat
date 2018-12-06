from pyspark.sql import SparkSession
from pyspark import SparkContext
#from pyspark.sql.types import *
sc = SparkContext(appName="BridgeService")
spark = SparkSession(sc)

from flask import Flask
from flask import request
import collections
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
    hdfsParquetContent= spark.read.format("parquet").load(path)
    return hdfsParquetContent

def getHDFSContentCSV(path):
    hdfsCSVContent = spark.read.format("csv").load(path, quote="\"", header=True, inferSchema=True, sep=',')
    return hdfsCSVContent

def getHDFSContentORC(path):
    hdfsORCContent = spark.read.format("orc").load(path)
    return hdfsORCContent

def readData(file):
    sizeOfArray = len(file.split('.'))
    fileType = file.split('.')[sizeOfArray - 1]
    if fileType=="parquet":
        return getHDFSContentParquet(file)
    elif fileType=="orc":
        return getHDFSContentORC(file)
    elif fileType=="csv":
        return getHDFSContentCSV(file)



@app.route('/get-table-columns',methods=['POST'])
def getTableColumns():
    filePath = request.form["file"]
    content = readData(filePath)
    return json.dumps(content.columns)


@app.route('/get-table-columns-with-types',methods=['POST'])
def getTableColumnsWithTypes():
    filePath = request.form["file"]
    content = readData(filePath)
    typeList = content.dtypes
    tableInfoJson=[]
    headers=["column","columnType"]
    index=1
    for type in typeList:
        cell={}
        i=0
        for header in headers:
            cell[header]=type[i]
            i=i+1
        tableInfoJson.append(cell)
        index = index+1

    return json.dumps(tableInfoJson)

@app.route('/test',methods=['GET'])
def test():
    df = readData("/example3/test.parquet")
    filteredRdd = df.limit(2)
    return json.dumps(filteredRdd)



@app.route('/get-data', methods=['POST'])
def getData():
    query = request.form["query"]
    table = request.form["table"]
    file = request.form["path"]
    selectItem = request.form["selectItem"].split(",")
    content = readData(file)
    content.createOrReplaceTempView(table)
    res = spark.sql(query).collect()
    dataset = {}
    subDataset=[]
    i = 0
    for item in res:
        index = 0
        row = []
        for subItem in item:
            subData = {}
            subData["column"] = selectItem[index]
            subData["value"] = subItem
            row.append(subData)
            index = index + 1
        subDataset.append(row)
        i = i + 1
    dataset["data"]=subDataset
    return jsonify(dataset)

def getTableContentAndColumnsOfFile(file):
    content = readData(file)
    return content, content.columns

@app.route('/get-raw-data', methods=['POST'])
def getRawData():

    file = request.form["path"]
    content,selectItem = getTableContentAndColumnsOfFile(file)
    content.createOrReplaceTempView("RESULT")
    res = spark.sql("SELECT * FROM RESULT").collect()
    dataset = {}
    subDataset = []
    i = 0
    for item in res:
        index = 0
        row = []
        for subItem in item:
            subData = {}
            subData["column"] = selectItem[index]
            subData["value"] = subItem
            row.append(subData)
            index = index + 1
        subDataset.append(row)
        i = i + 1
    dataset["data"] = subDataset
    return jsonify(dataset)

def run_command(command):
    p = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    return iter(p.stdout.readline, b'')


@app.route('/run-spark-job',methods=['POST'])
def runSparkJob():
    try:
       command = request.form['command'].split()
       fileName=request.form['file']
       fileName = "log_"+fileName
       file = open("/spark_logs/"+fileName, "w")
       for line in run_command(command):
           file.write(line)
       file.close()
       return "True"
    except:
       return "False"


def convert(data):
    if isinstance(data, basestring):
        return str(data)
    elif isinstance(data, collections.Mapping):
        return dict(map(convert, data.iteritems()))
    elif isinstance(data, collections.Iterable):
        return type(data)(map(convert, data))
    else:
        return data


#data_types={"StringType": StringType(), "BinaryType":BinaryType(), "BooleanType":BooleanType(), "DateType":DateType(),
#   "TimestampType":TimestampType(), "DoubleType":DoubleType(), "FloatType":FloatType(), "ByteType":ByteType(), "IntegerType":IntegerType(),
#   "LongType":LongType(), "ShortType":ShortType()}

#def __create_schema(schema_info):
#   schema=StructType()
#   num_of_cols = len(schema_info)
#   for i in range(num_of_cols):
#       elem=schema_info[str(i)]
#       if(elem["data_type"]=="ArrayType"):
#           schema.add(StructField(elem["column_name"], ArrayType(data_types[elem["extra"]["data_type"]], elem["extra"]["is_nullable"]), elem["is_nullable"]))
#       else:
#           schema.add(StructField(elem["column_name"], data_types[elem["data_type"]], elem["is_nullable"]))
#   return schema

# @app.route('/write-to-topic', methods=['POST'])
# def writeToTopic():
#    connection_info = convert(json.loads(request.form['connection_info']))
#    key_column = convert(request.form["key_column"])
#    data = convert(json.loads(request.form["data"]))

#    schema= __create_schema(convert(json.loads(request.form["schema"])))

#    if (not isinstance(data, list)):
#        data = [data]
#    cur_df = spark.createDataFrame(data, schema)
#    cur_df.selectExpr("CAST(" + key_column + " AS STRING) AS key", "to_json(struct(*)) AS value").write.format(
#        "kafka").option("kafka.bootstrap.servers", connection_info["host"] + ":" + connection_info["port"]).option(
#        "topic", connection_info["topic"]).save()

#    return "True"

app.run(host="0.0.0.0", port=5000, threaded=True)
