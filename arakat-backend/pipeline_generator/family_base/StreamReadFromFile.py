from domain.ErrorTypes import ErrorTypes
from validity import IncomingEdgeValidityChecker, DataSourceValidityChecker
from utils import CodeGenerationUtils

import os

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

            code.extend(["df_" + node["id"] + ' = spark.readStream.schema(schema_'+node["id"]+")."+node["file_type"]+"(" + CodeGenerationUtils.arrange_parameter_value(node["parameters"]["file_path"])+")", os.linesep])

    return code, error