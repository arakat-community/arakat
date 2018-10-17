import os

from domain.ErrorTypes import ErrorTypes
from utils.code_generation import CodeGenerationUtils
from validity import IncomingEdgeValidityChecker, DataSourceValidityChecker


def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {0}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    code=[]
    shared_function_set = set()
    additional_local_code=[]
    errors=[]
    if(error == ErrorTypes.NO_ERROR):
        error, is_schema_appropriate=DataSourceValidityChecker.check_validity(node)
        if(error == ErrorTypes.NO_ERROR):
            my_args = {"node_id": node["id"], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}
            # Must be a valid schema at this point.
            additional_code, param_string = CodeGenerationUtils.handle_parameter(node["parameter"]["schema"], my_args)
            code.extend(additional_code)

            code.extend(["df_" + node["id"] + ' = spark.readStream.schema(' + param_string +")." + node["file_type"] +"(" + CodeGenerationUtils.handle_primitive(node["parameters"]["path"]["value"]) + ")", os.linesep])
            code = [additional_local_code, os.linesep].extend(code)

    return code, shared_function_set, error