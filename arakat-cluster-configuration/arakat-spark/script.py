# USAGE
# spark-submit deneme.py show-cols
# spark-submit deneme.py show -rc 50 -t False -p hdfs://namenode:9000/example5/test.parquet -o column -s ASC
# spark-submit deneme.py schema -p hdfs://namenode:9000/example5/test.parquet

from pyspark import SparkContext
from pyspark.sql import SparkSession
import sys
import os


def string_to_boolean(param):
    if param.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif param.lower() in ('no', 'false', 'f', 'n', '0'):
        return False


def parse_arguments():
    previous_value = ""
    r_count = 100
    is_trun = False
    oper = ""
    f_path = ""
    order_by_col = ""
    sort = ""

    for argument in sys.argv:
        if "show" == argument:
            oper = "show"
        elif "schema" == argument:
            oper = "printSchema"
        elif "show-cols" == argument:
            oper = "showCollections"
        elif "-rc" == previous_value:
            r_count = int(argument)
        elif "-t" == previous_value:
            is_trun = string_to_boolean(argument)
        elif "-p" == previous_value:
            f_path = argument
        elif "-o" == previous_value:
            order_by_col = argument
        elif "-s" == previous_value:
            sort = argument

        previous_value = argument

    return r_count, is_trun, oper, f_path, order_by_col, sort


def get_file_content(f_extension, f_path):
    df = None
    if f_extension == ".csv":
        df = spark.read.format("csv").option("header", "true").load(f_path)
    elif f_extension == ".parquet":
        df = spark.read.parquet(f_path)
    elif f_extension == ".orc":
        df = spark.read.format("csv").load(f_path)
    elif f_extension == ".txt":
        print("text_file")

    return df

row_count, is_truncated, operation, file_path, order_by_column, sort_by = parse_arguments()

sc = SparkContext(appName="test")
spark = SparkSession(sc)

filename, file_extension = os.path.splitext(file_path)
data_frame = get_file_content(file_extension, file_path)

if (order_by_column != "") and (sort_by != ""):
    data_frame.createOrReplaceTempView("table")
    data_frame = spark.sql("SELECT * from table ORDER BY " + order_by_column + " " + sort_by)

if operation == "show":
    data_frame.show(row_count, is_truncated)

elif operation == "printSchema":
    data_frame.printSchema()

elif operation == "showCollections":
    print("++++++++++++++++++++++++++++++++++++++++++++++")
    print(data_frame.columns)
    print("++++++++++++++++++++++++++++++++++++++++++++++")