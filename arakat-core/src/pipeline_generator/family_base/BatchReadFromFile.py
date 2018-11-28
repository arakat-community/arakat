from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker, DataSourceValidityChecker

def generate_code(args):
    node=args["node"]
    requireds_info=args["requireds_info"]
    edges=args["edges"]

    checklist={"df_count": {0}, "model_count": {0}}
    error, extra= IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    final_code=[]
    shared_function_set=set()
    additional_local_code=[]
    errors=[]
    if(error == ErrorTypes.NO_ERROR):
        error, is_schema_appropriate= DataSourceValidityChecker.check_validity(node)
        if(error == ErrorTypes.NO_ERROR):
            my_args = {"node_id": node["id"], "shared_function_set": shared_function_set,"additional_local_code": additional_local_code, "errors": errors}
            if(is_schema_appropriate):
                gen_code= CodeGenerationUtils.handle_instantination_or_call(node["parameters"], "df_" + node["id"] + "=" + "spark.read." + node["file_type"] + "(", my_args)
            else:
                # For safety, but consider it again
                if ("schema" in node["parameters"]):
                    del node["parameters"]["schema"]

                if(node["can_infer_schema"]):
                    node["parameters"]["inferSchema"]={"value": True, "type": "boolean"}

                gen_code = CodeGenerationUtils.handle_instantination_or_call(node["parameters"], "df_" + node["id"] + "=" + "spark.read.format(" + CodeGenerationUtils.handle_primitive(node["file_type"]) + ").load(", my_args)

            final_code= CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error