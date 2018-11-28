import os

from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import SpecialRequirementHandlerForParameters

__types_requiring_special_handling={"object", "dict", "regex", "template", "code", "ALL"}

def handle_arguments(parameters, args):
    parameter_string_code=[]

    for param in parameters:
        param_string = handle_parameter(parameters[param], args)
        parameter_string_code.extend([param + "=" + param_string, ", "])

    if (len(parameters) > 0):
        parameter_string_code.pop()

    return parameter_string_code

def handle_instantination_or_call(parameters, initial_code, args):
    parameter_string_code = handle_arguments(parameters, args)

    result=[initial_code]
    result.extend(parameter_string_code)
    result.extend([")", os.linesep])

    return result

def handle_parameter(parameter, args):
    type_info = __get_type_info(parameter["type"])
    # In the future, we may specialize here for objects and dicts. For now, we assume that families handle any object/dict if given.
    # We handle them as whole in case (e.g. schema)
    if(type_info["type"] == "array"):
        value = ["["]
        special_reqs_to_child={}
        if ("special_requirements" in parameter and "special_requirements" not in parameter["value"]):
            special_reqs_to_child=parameter["special_requirements"]
        for val in parameter["value"]:
            value.extend([handle_parameter({"value": val, "type": type_info["array_of"], "special_requirements": special_reqs_to_child}, args), ", "])
        if (len(parameter["value"]) > 0):
            value.pop()
        value.append("]")
        value = ''.join(value)
        return value
    else:
        if ("special_requirements" in parameter and parameter["type"] in parameter["special_requirements"]):
            return SpecialRequirementHandlerForParameters.handle_parameter(parameter, parameter["special_requirements"][parameter["type"]], args)
        else:
            if(parameter["type"] in __types_requiring_special_handling):
                args["errors"].append(ErrorTypes.SPECIAL_REQUIREMENT_NOT_SPECIFIED_ERROR)
                return None
            return handle_primitive(parameter["value"])

def handle_primitive(value):
    if (isinstance(value, str)):
        value = __add_quotes_around_val(value)
    else:
        value = str(value)

    return value

def __add_quotes_around_val(val):
    return '"'+str(val)+'"'

def __get_type_info(raw_type):
    result={}
    if(raw_type.startswith("array")):
        result["type"]="array"
        result["array_of"]=raw_type[6:-1]
    else:
        result["type"]=raw_type

    return result

def merge_with_additional_code(gen_code, additional_local_code):
    final_code=[]
    final_code.extend(additional_local_code)
    final_code.append(os.linesep)
    final_code.extend(gen_code)
    return final_code