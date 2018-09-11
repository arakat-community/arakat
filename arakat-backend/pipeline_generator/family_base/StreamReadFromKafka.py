from domain.ErrorTypes import ErrorTypes
from validity import IncomingEdgeValidityChecker, DataSourceValidityChecker
from utils import CodeGenerationUtils

import os
# Consider adding offset option...
def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {0}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    if(error == ErrorTypes.NO_ERROR):
        error, is_schema_appropriate=DataSourceValidityChecker.check_validity(node)
        if(error == ErrorTypes.NO_ERROR):
            # Must be a valid schema at this point.
            code.append("schema_" + node["id"] + "=")
            code.extend([CodeGenerationUtils.arrange_schema(node["parameter"]["schema"]), os.linesep])

            code.append("df_" + node["id"] + ' = spark.readStream.format("kafka").option("kafka.bootstrap.servers", ')
            code.append(CodeGenerationUtils.arrange_parameter_value(node["parameters"]["host"] + ":" + node["parameters"]["port"])+")")
            code.append('.option("subscribe", '+ CodeGenerationUtils.arrange_parameter_value(node["parameters"]["topic"]+")"))
            code.append('.load().select(from_json(col("value").cast("string"), schema_'+node["id"]+")")
            # For streams, we will use timestamp as a key while writing to kafka topic in case.
            code.extend(['.alias("value"), "timestamp").select("value.*", "timestamp")', os.linesep])

    return code, error