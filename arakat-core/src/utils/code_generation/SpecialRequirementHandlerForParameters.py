import os

from src.domain.SharedFunctionTypes import SharedFunctionTypes

# In the future, separate this file into smaller portions...

def handle_parameter(parameter, special_requirement, args):
    # Handle parameter aims to create functions that are required for parameters
    # There are 2 types of functions:
    # -> Shared functions that one or more parameter that can use. They are predefined set of functions. (Let's name this as global functions)
    # -> Functions that are specific to the parameter (Hard-coded). In that case, function name will be coded by the id of the node and the name of the parameter. Use better naming if required. (Let's name this as local functions)

    # args are specific to the family (family knows what it needs)
    return __specific_function_handlers[special_requirement](parameter, args)

def __handle_column_selector_regex(parameter, args):
    # Make necessary assertions...
    # If json causes problems for regex string, handle it here...
    args["shared_function_set"].add(SharedFunctionTypes.COLUMN_MATCH_WITH_REGEX)
    parameter_string="column_selector_regex('" + parameter["value"] + "', " + args["input_dfs"][0] + ")"
    return parameter_string

def __handle_element_of_multi_instance(parameter, args):
    return parameter[args["element_index"]]

def __handle_schema(parameter, args):
    # schema_info: {"0": {"column_name":"name", "data_type": "StringType", "is_nullable": True}, "1": {"column_name":"name", "data_type": "ArrayType", "is_nullable": True, "extra":{"data_type": "IntegerType", "is_nullable": False}}, ...}
    schema_info=parameter["value"]
    additional_code = ["schema_" + args["node_id"] + "=" + "StructType()"]
    num_of_cols=len(schema_info)
    for i in range(num_of_cols):
        elem=schema_info[str(i)]
        if (elem["data_type"] == "ArrayType"):
            additional_code.extend(['.add(StructField("' + elem["column_name"] + '", ArrayType(' + elem["extra"][
                "data_type"] + '(), ' + str(elem["extra"]["is_nullable"]) + '), ' + str(
                elem["is_nullable"]) + "))"])
        else:
            additional_code.extend(['.add(StructField("' + elem["column_name"] + '", ' + elem["data_type"] + '(), ' + str(
                elem["is_nullable"]) + "))"])

    additional_code.extend([os.linesep])

    param_string="schema_"+args["node_id"]
    args["additional_local_code"].extend(additional_code)

    return param_string

def __handle_function_code(parameter, args):
    # Assuming that this parameter will not be used inside function call or instantination. It will be called for a single parameter, and caller will decide how to use function name.
    # In fact, we can send a modifier function to generate a function call using new name of the user-given-function. However, in case there are multiple "code" type parameters, modifier function names will collide.
    # It is possible to handle such cases, but for now we stick with the given assumption!
    updated_function_name, function_code = __change_function_name(parameter["value"], args["node_id"])
    args["additional_local_code"].extend(function_code)
    return updated_function_name

def __change_function_name(function_string, node_id):
    part1 = function_string[3:]
    name_end_index = part1.find("(")
    function_name = part1[:name_end_index].strip()
    rest = part1[name_end_index:]
    updated_function_name = function_name + "_" + node_id
    function_code = ["def " + updated_function_name + rest, os.linesep, os.linesep]
    return updated_function_name, function_code

def __handle_column_selector_template(parameter, args):
    args["shared_function_set"].add(SharedFunctionTypes.COLUMN_MATCH_WITH_TEMPLATE)
    param_val=parameter["value"]
    template_input=["["]
    for i in range(len(param_val)):
        if (param_val[i]["type"] == "range"):
            template_input.append(str(range(param_val[i]["value"]["start"], param_val[i]["value"]["end"])))
            template_input.append(",")
        elif (param_val[i]["type"] == "array"):
            template_input.append(__process_array_for_template(param_val[i]["value"]))
            template_input.append(",")

    # Assert that template parameter must contain values...
    template_input.pop()
    template_input.append("]")
    template_string = __create_template_helpers(len(param_val))

    parameter_string = "column_selector_template(" + ''.join(template_input) + ", " + template_string + ")"
    return parameter_string

def __create_template_helpers(num_of_elements):
    template_code=[]
    for i in range(num_of_elements):
        template_code.append("${v"+str(i)+"}")

    return "'"+''.join(template_code)+"'"

def __process_array_for_template(arr):
    value = ["["]
    for val in arr:
        if (isinstance(val, str)):
            value.extend(['"'+str(val)+'"', ', '])
        else:
            value.extend([str(val), ", "])
    if (len(arr) > 0):
        value.pop()
    value.append("]")
    value = ''.join(value)
    return value

def __handle_column_selector_ALL(parameter, args):
    args["shared_function_set"].add(SharedFunctionTypes.COLUMN_MATCH_WITH_ALL)
    parameter_string = "column_selector_ALL(" + args["input_dfs"][0] + ")"
    return parameter_string

def __handle_simple_dict(parameter, args):
    # Dict of key-value pairs which keys and values are primitives...
    code=["{"]
    for key, value in parameter["value"].iteritems():
      code.extend([__handle_primitive(key) + ":" + __handle_primitive(value), ", "])

    if(bool(parameter["value"])):
        code.pop()

    code.extend("}")

    return ''.join(code)

def __handle_primitive(value):
    if (isinstance(value, str)):
        return '"'+str(value)+'"'
    else:
        return str(value)

__specific_function_handlers={"column_selector_regex": __handle_column_selector_regex, "column_selector_template": __handle_column_selector_template, "column_selector_ALL": __handle_column_selector_ALL, "element_of_multi_instance": __handle_element_of_multi_instance, "schema": __handle_schema, "code": __handle_function_code, "simple_dict": __handle_simple_dict}