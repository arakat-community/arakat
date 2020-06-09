from src.domain.ErrorTypes import ErrorTypes
from src.domain.NodeFamilyTypes import NodeFamilyTypes

from src.domain import DomainUtils


def check_validity(node):
    error, is_schema_appropriate = __check_schema(node)
    if(node["family"] == NodeFamilyTypes.BatchReadFromFile.value or node["can_infer_schema"]):
        if(error == ErrorTypes.SCHEMA_REQUIRED_ERROR):
            error=ErrorTypes.NO_ERROR
            is_schema_appropriate=False

    return error, is_schema_appropriate

def __check_schema(node):
    is_schema_appropriate = False
    if ("schema" in node["parameters"] and bool(node["parameters"]["schema"])):
        error = __is_schema_valid(node["parameters"]["schema"]["value"])
        if (error == ErrorTypes.NO_ERROR):
            is_schema_appropriate = True
        else:
            error=ErrorTypes.INVALID_SCHEMA_ERROR
    else:
        error = ErrorTypes.SCHEMA_REQUIRED_ERROR

    return error, is_schema_appropriate

def __is_schema_valid(schema):
    for elem in schema:
        if(schema[elem]["data_type"] == "ArrayType"):
            if(not DomainUtils.is_data_type_allowed(schema[elem]["extra"]["data_type"])):
                return ErrorTypes.UNSUPPORTED_DATA_TYPE_ERROR
        else:
            if(not DomainUtils.is_data_type_allowed(schema[elem]["data_type"])):
                return ErrorTypes.UNSUPPORTED_DATA_TYPE_ERROR

    return ErrorTypes.NO_ERROR
