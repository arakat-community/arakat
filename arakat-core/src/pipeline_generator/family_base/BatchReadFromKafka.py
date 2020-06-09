import os

from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker, DataSourceValidityChecker


# Consider adding offset option...
def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {0}, "model_count": {0}}
    error, extra= IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    final_code=[]
    shared_function_set = set()
    additional_local_code = []
    errors = []
    if(error == ErrorTypes.NO_ERROR):
        error, is_schema_appropriate= DataSourceValidityChecker.check_validity(node)
        if(error == ErrorTypes.NO_ERROR):
            # Must be a valid schema at this point.
            gen_code=[]
            my_args = {"node_id": node["id"], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}
            param_string = CodeGenerationUtils.handle_parameter(node["parameter"]["schema"], my_args)

            gen_code.append("df_" + node["id"] + ' = spark.read.format("kafka").option("kafka.bootstrap.servers", ')
            gen_code.append(CodeGenerationUtils.handle_primitive(node["parameters"]["host"]["value"] + ":" + node["parameters"]["port"]["value"]) + ")")
            gen_code.append('.option("subscribe", ' + CodeGenerationUtils.handle_primitive(node["parameters"]["topic"]["value"] + ")"))
            gen_code.append('.load().select(from_json(col("value").cast("string"), ' + param_string +")")
            # For batch use, including timestamp might be useless...
            gen_code.extend(['.alias("value")).select("value.*")', os.linesep])

            final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error