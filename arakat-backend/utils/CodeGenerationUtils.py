import os

def arrange_parameter_value(parameter_value):
    # For now, we will not allow dict and set; but handle them in case...
    if(isinstance(parameter_value, str)):
        value=__add_quotes_around_val(parameter_value)
    elif(isinstance(parameter_value, list)):
        value=["["]
        for val in parameter_value:
            value.extend([arrange_parameter_value(val), ", "])
        value.pop()
        value.append("]")
        value=''.join(value)
    else:
        value=str(parameter_value)

    return value

def __add_quotes_around_val(val):
    return '"'+str(val)+'"'

def arrange_schema(schema_info):
    # schema_info: [{"column_name":"name", "data_type": "StringType", "is_nullable": True}, {"column_name":"name", "data_type": "ArrayType", "is_nullable": True, "array_extra":{"data_type": "IntegerType", "is_nullable": False}}, ...]
    code=["StructType(["]
    for elem in schema_info:
        if(elem["data_type"] == "ArrayType"):
            code.extend(['StructField("'+ elem["column_name"] +'", ArrayType(' + elem["array_extra"]["data_type"] +'(), ' + str(elem["array_extra"]["is_nullable"]) + '), ' + str(elem["is_nullable"]) + ")", ", "])
        else:
            code.extend(['StructField("' + elem["column_name"] +'", ' + elem["data_type"] + '(), ' + str(elem["is_nullable"]) + ")", ", "])

    # Might be an unnecessary check
    if (len(schema_info) > 0):
        code.pop()
    code.append("])")
    return code