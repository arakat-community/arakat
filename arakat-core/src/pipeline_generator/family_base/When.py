import os

from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker


# In the future, make SQL node much more generic and move this into it.
# When condition should be of type column. For now, we will accept only a single element in the condition (no complex boolean logic).

def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra= IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    final_code=[]
    shared_function_set = set()
    additional_local_code = []
    errors = []
    if(error == ErrorTypes.NO_ERROR):
        if ("portion" in extra["dfs"][0]):
            df_name = "df_" + extra["dfs"][0]["source_id"] + "[" + str(extra["dfs"][0]["portion"]) + "]"
        else:
            df_name = "df_" + extra["dfs"][0]["source_id"]

        my_args = {"node_id": node["id"], "input_dfs": [df_name], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}

        df_name = "df_" + my_args["node_id"]
        gen_code = [df_name + " = " + my_args["input_dfs"][0], os.linesep]

        input_columns = ["["]
        conditions=["["]
        values = ["["]
        otherwises = ["["]
        output_columns = ["["]
        for exp in node["parameters"]["expressions"]["value"]:
            input_columns.extend([CodeGenerationUtils.handle_parameter(exp["input_columns"], my_args), ", "])
            conditions.extend([CodeGenerationUtils.handle_parameter(exp["condition"], my_args), ", "])
            values.extend([CodeGenerationUtils.handle_parameter(exp["value"], my_args), ", "])
            otherwises.extend([CodeGenerationUtils.handle_parameter(exp["otherwise"], my_args), ", "])
            output_columns.extend([CodeGenerationUtils.handle_parameter(exp["output_columns"], my_args), ", "])

        # Check there are at least 1 elememnt in expressions
        input_columns.pop()
        conditions.pop()
        values.pop()
        otherwises.pop()
        output_columns.pop()

        input_columns.extend(["]"])
        conditions.extend(["]"])
        values.extend(["]"])
        otherwises.extend(["]"])
        output_columns.extend(["]"])

        gen_code.extend(["input_columns = " + ''.join(input_columns), os.linesep])
        gen_code.extend(["conditions = "+ ''.join(conditions), os.linesep])
        gen_code.extend(["values = " + ''.join(values), os.linesep])
        gen_code.extend(["otherwises = " + ''.join(otherwises), os.linesep])
        gen_code.extend(["output_columns = " + ''.join(output_columns), os.linesep])

        gen_code.extend(["for in_cols, cond, val, otw, out_cols in zip(input_columns, conditions, values, otherwises, output_columns):", os.linesep])
        gen_code.extend(["\tfor in_col, out_col in zip(in_cols, out_cols):", os.linesep])
        gen_code.extend(["\t\tcur_cond = eval(cond.replace('$','"+df_name+"[\"'+in_col+'\"]'"+"))", os.linesep])
        gen_code.extend(["\t\t" + df_name + " = " + df_name + ".withColumn(out_col, F.when(cur_cond, val).otherwise(otw))", os.linesep])

        final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error