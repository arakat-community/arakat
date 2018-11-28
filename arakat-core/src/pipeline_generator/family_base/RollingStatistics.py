import os

from src.domain.ErrorTypes import ErrorTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker


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
        gen_code=[]
        gen_code.extend(["df_" + node["id"] + "=" + df_name, os.linesep])

        between_operation=node["parameters"]["rolling_stats_info"]["value"]["between_operation"]["value"]

        first_argument_input_cols = CodeGenerationUtils.handle_parameter(node["parameters"]["rolling_stats_info"]["value"]["first_argument"]["value"]["input_cols"], my_args)
        first_argument_operation = node["parameters"]["rolling_stats_info"]["value"]["first_argument"]["value"]["operation"]["value"]
        gen_code.extend(["first_cols = " + first_argument_input_cols, os.linesep])

        output_cols = CodeGenerationUtils.handle_parameter(node["parameters"]["rolling_stats_info"]["value"]["output_cols"], my_args)
        gen_code.extend(["output_cols = " + output_cols, os.linesep])

        partitioning_column=node["parameters"]["rolling_stats_info"]["value"]["partitioning_column"]["value"]
        ordering_column = node["parameters"]["rolling_stats_info"]["value"]["ordering_column"]["value"]
        ordering_direction = node["parameters"]["rolling_stats_info"]["value"]["ordering_direction"]["value"]

        lags = node["parameters"]["rolling_stats_info"]["value"]["lags"]
        lags_str= CodeGenerationUtils.handle_parameter(lags, my_args)

        window_str = "over (partition by " + partitioning_column + " order by " + ordering_column + " " + ordering_direction + " rows "+ "'+ str(lag) +'" +" preceding) "

        # if window_size == -1:
        #     window_str = "over (partition by " + partition_column + " order by " + ordering_column + " " + ordering_direction + " rows unbounded preceding) "
        # else:
        #     window_str = "over (partition by " + partition_column + " order by " + ordering_column + " " + ordering_direction + " rows " + str(window_size) + " preceding) "

        if between_operation != 'Identity':
            second_argument_input_cols = CodeGenerationUtils.handle_parameter(node["parameters"]["rolling_stats_info"]["value"]["second_argument"]["value"]["input_cols"], my_args)
            second_argument_operation = node["parameters"]["rolling_stats_info"]["value"]["second_argument"]["value"]["operation"]["value"]
            gen_code.extend(["second_cols = " + second_argument_input_cols, os.linesep])

            loop_str = "for col_1,col_2,out_col in zip(first_cols, second_cols, output_cols):"
            if first_argument_operation == 'Identity':
                if second_argument_operation == 'Identity':
                    select_str = "df_" + node["id"] + " = df_" + node["id"] + ".selectExpr('*', col_1 + ' " + between_operation + " '+ col_2 + ' as out_col' + str(lag))"
                else:
                    select_str = "df_" + node["id"] + " = df_" + node["id"] + ".selectExpr('*', col_1 + ' " + between_operation + " ' + '" + second_argument_operation + "(' + col_2 + ') " + window_str + "as out_col' + str(lag))"
            else:
                if second_argument_operation == 'Identity':
                    select_str = "df_" + node["id"] + " = df_" + node["id"] + ".selectExpr('*', '" + first_argument_operation + "(' + col_1 + ') " + window_str + between_operation + " ' + col_2 + ' as out_col' + str(lag))"
                else:
                    select_str = "df_" + node["id"] + " = df_" + node["id"] + ".selectExpr('*', '" + first_argument_operation + "(' + col_1 + ') " + window_str + between_operation + " " + second_argument_operation + "(' + col_2 + ') " + window_str + "as out_col' + str(lag))"
        else:
            loop_str = "for col_1,out_col in zip(first_cols, output_cols):"
            if first_argument_operation == 'Identity':
                select_str = "df_" + node["id"] + " = df_" + node["id"] + ".selectExpr('*', col_1 + ' as out_col' + str(lag))"
            else:
                select_str = "df_" + node["id"] + " = df_" + node["id"] + ".selectExpr('*', '" + first_argument_operation + "(' + col_1 + ') " + window_str + "as out_col' + str(lag))"


        gen_code.extend(["lags = " + lags_str, os.linesep])
        gen_code.extend(["for lag in lags:", os.linesep])

        gen_code.extend(["\t", loop_str, os.linesep])
        gen_code.extend(["\t\t" + select_str, os.linesep])

        final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error