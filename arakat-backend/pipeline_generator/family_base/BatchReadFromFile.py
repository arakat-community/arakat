from domain.ErrorTypes import ErrorTypes
from validity import IncomingEdgeValidityChecker, DataSourceValidityChecker
from utils import CodeGenerationUtils

import os

def generate_code(args):
    node=args["node"]
    requireds_info=args["requireds_info"]
    edges=args["edges"]

    checklist={"df_count": {0}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    if(error == ErrorTypes.NO_ERROR):
        error, is_schema_appropriate=DataSourceValidityChecker.check_validity(node)
        if(error == ErrorTypes.NO_ERROR):
            remaining_params = node["parameters"].keys()
            remaining_params.remove("file_path")
            if(is_schema_appropriate):
                code.append("schema_"+node["id"]+"=")
                code.extend([CodeGenerationUtils.arrange_schema(node["parameter"]["schema"]), os.linesep])
                code.append("df_" + node["id"] + "=" + "spark.read."+ node["file_type"] +"(path=" + CodeGenerationUtils.arrange_parameter_value(node["parameters"]["file_path"] + ", " + "schema="+ "schema_"+node["id"]))
                remaining_params.remove("schema")
            else:
                if(node["can_infer_schema"]):
                    code.append("df_" + node["id"] + "=" + "spark.read." + node["file_type"] + "(path=" + CodeGenerationUtils.arrange_parameter_value(node["parameters"]["file_path"]) +", " +"inferSchema="+"True")
                else:
                    code.append("df_" + node["id"] + "=" + "spark.read." + node["file_type"] + "(path=" + CodeGenerationUtils.arrange_parameter_value(node["parameters"]["file_path"]))

            for param in remaining_params:
                code.extend([", " + param + "=" + CodeGenerationUtils.arrange_parameter_value(node["parameters"][param])])
            code.extend([")", os.linesep])

    return code, error