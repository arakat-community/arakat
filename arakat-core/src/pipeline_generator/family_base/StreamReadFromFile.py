import os

from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker, DataSourceValidityChecker


def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {0}, "model_count": {0}}
    error, extra= IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    final_code=[]
    shared_function_set = set()
    additional_local_code=[]
    errors=[]
    if(error == ErrorTypes.NO_ERROR):
        error, is_schema_appropriate= DataSourceValidityChecker.check_validity(node)
        if(error == ErrorTypes.NO_ERROR):
            my_args = {"node_id": node["id"], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}
            # Must be a valid schema at this point.
            param_string = CodeGenerationUtils.handle_parameter(node["parameter"]["schema"], my_args)
            gen_code=[]

            gen_code.extend(["df_" + node["id"] + ' = spark.readStream.schema(' + param_string +")." + node["file_type"] +"(" + CodeGenerationUtils.handle_primitive(node["parameters"]["path"]["value"]) + ")", os.linesep])

            final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error