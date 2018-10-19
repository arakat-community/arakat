from domain.SharedFunctionTypes import SharedFunctionTypes

import os

def get_code_for_function(func_type):
    return __shared_function_store[func_type]()

def __handle_column_match_with_regex():
    # Create function-code which will find columns matching the regex
    # We might include imports inside the function
    # In the future, consider passing the import_set here and add the required imports to it...
    function_code=[os.linesep, "import re", os.linesep, "def column_selector_regex(regex_str, cur_df):", os.linesep]
    function_code.extend(["\t", "matching_cols=[]", os.linesep])
    function_code.extend(["\t", "for col_name in cur_df.columns:", os.linesep])
    function_code.extend(["\t\t", "if(re.match(regex_str, col_name)):", os.linesep])
    function_code.extend(["\t\t\t", "matching_cols.append(col_name)", os.linesep])
    function_code.extend(["\t", "return matching_cols", os.linesep])
    return function_code

def __handle_column_match_with_template():
    function_code=[os.linesep, "import itertools", os.linesep, "from string import Template", os.linesep, "def column_selector_template(template_input, template_string):", os.linesep]
    function_code.extend(["\t", "input_combinations=itertools.product(*template_input)", os.linesep])
    function_code.extend(["\t", "template=Template(template_string)", os.linesep])
    function_code.extend(["\t", "result=[]", os.linesep])
    function_code.extend(["\t", "for val in input_combinations:", os.linesep])
    function_code.extend(["\t\t", "args={}", os.linesep])
    function_code.extend(["\t\t", "for i in range(len(val)):", os.linesep])
    function_code.extend(["\t\t\t", "args['v'+str(i)]=val[i]", os.linesep])
    function_code.extend(["\t\t", "result.append(template.substitute(**args))", os.linesep])
    function_code.extend(["\t", "return result", os.linesep])
    return function_code

def __handle_column_match_with_ALL():
    function_code=["def column_selector_ALL(cur_df):", os.linesep]
    function_code.extend(["\t", "return cur_df.columns", os.linesep])
    return function_code

def __generate_select_expr_helpers():
    code=[]
    code.extend(__generate_pattern_creator_for_select_expr_code())
    code.extend(__generate_single_select_expr_generator_code())
    return code

# Add checks and error handling later...
def __generate_pattern_creator_for_select_expr_code():
    code = [os.linesep]
    code.extend(['def pattern_creator_for_select_expr(input_cols, output_cols, prev, next, sep, pop_last, beginning, ending):', os.linesep])
    code.extend(['\tpattern = [beginning]', os.linesep])
    code.extend(['\tif (len(input_cols) == len(output_cols)):', os.linesep])
    code.extend(['\t\tfor v1, v2 in zip(input_cols, output_cols):', os.linesep])
    code.extend(['\t\t\tpattern.extend([prev, v1, next, " as " + v2, sep])', os.linesep])
    code.extend(['\telse:', os.linesep])
    code.extend(['\t\tfor v1 in input_cols:', os.linesep])
    code.extend(['\t\t\tpattern.extend([prev, v1, next, sep])', os.linesep])
    code.extend(['\tfor p in range(pop_n):', os.linesep])
    code.extend(['\t\tpattern.pop()', os.linesep])
    code.extend(['\tpattern.append(ending)', os.linesep])
    code.extend(['\tif (len(input_cols) > len(output_cols) and len(output_cols) == 1):', os.linesep])
    code.extend(['\t\tpattern.append(" as " + output_cols[0])', os.linesep])
    code.extend(['\treturn pattern', os.linesep])
    code.append(os.linesep)
    return code

# Add checks and error handling later...
def __generate_single_select_expr_generator_code():
    code = [os.linesep]
    code.extend(['def single_select_expr_generator(input_cols, output_cols, operation):', os.linesep])
    code.extend(['\tone_to_one_ops={"Identity", "abs", "round", "dayofmonth", "dayofweek", "dayofyear"}', os.linesep])
    code.extend(['\tif (operation in one_to_one_ops):', os.linesep])
    code.extend(['\t\tif (operation == "Identity"):', os.linesep])
    code.extend(['\t\t\tpattern = pattern_creator_for_select_expr(input_cols, output_cols, "", "", ", ", 1, "", "")', os.linesep])
    code.extend(['\t\telse:', os.linesep])
    code.extend(['\t\t\tpattern = pattern_creator_for_select_expr(input_cols, output_cols, operation + "(", ")", ", ", 1, "", "")', os.linesep])
    code.extend(['\telse:', os.linesep])
    code.extend(['\t\tif (operation == "concat"):', os.linesep])
    code.extend(['\t\t\tpattern = pattern_creator_for_select_expr(input_cols, output_cols, "", "", ", ", 1, "concat(", ")")', os.linesep])
    code.extend(['\t\telse:', os.linesep])
    code.extend(['\t\t\tpattern = pattern_creator_for_select_expr(input_cols, output_cols, "", " " + operation, " ", 2, "", "")', os.linesep])
    code.extend(['\treturn "".join(pattern)', os.linesep])
    code.append(os.linesep)
    return code

__shared_function_store={SharedFunctionTypes.COLUMN_MATCH_WITH_REGEX: __handle_column_match_with_regex, SharedFunctionTypes.COLUMN_MATCH_WITH_TEMPLATE: __handle_column_match_with_template, SharedFunctionTypes.COLUMN_MATCH_WITH_ALL: __handle_column_match_with_ALL, SharedFunctionTypes.SELECT_EXPR_HELPERS: __generate_select_expr_helpers}