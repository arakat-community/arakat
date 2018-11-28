import os

from src.domain.NodeFamilyTypes import NodeFamilyTypes
from src.utils.code_generation import CodeGenerationUtils


def multi_instance_generation(node, df_name, args):
    code=__generate_code_for_pipeline_instantination(node, args)
    # code.extend(['pipeline_stage_' + node["id"] + "=" + 'pipeline_' + node["id"] + ".fit(" + df_name + ")", os.linesep])
    if(not ("in_pipeline" in args and args["in_pipeline"] == True)):
        code.extend(['model_' + node["id"] + "=" + 'pipeline_' + node["id"] + ".fit(" + df_name + ")", os.linesep])
        code.extend(['df_' + node["id"] + "=" + 'pipeline_stage_' + node["id"] + '.transform(' + df_name + ')', os.linesep])

    return code

def __generate_code_for_pipeline_instantination(node, args):
    code=[]
    non_indicator_params={}
    for param in node["parameters"]:
        if(param in node["multi_instance_indicator"]):
            code.extend(["mmi_value_" + param + "_" + node["id"] + " = " + CodeGenerationUtils.handle_parameter(node["parameters"][param], args), os.linesep])
        else:
            non_indicator_params[param]=node["parameters"][param]

    code.extend(["stages_"+node["id"], " = ", "[]", os.linesep])
    code.extend(["for i in ", "range(len(mmi_value_"+node["multi_instance_indicator"][0]+"_" + node["id"], ")):", os.linesep])
    code.extend(["\t", __generate_stage_template(node, non_indicator_params, args), os.linesep])
    if (not ("in_pipeline" in args and args["in_pipeline"])):
        code.extend(['pipeline_'+node["id"] + "=Pipeline(stages=", "stages_"+node["id"] + ")", os.linesep])

    return code

def __generate_stage_template(node, non_indicator_params, args):
    code = []
    class_name = ""
    # Do not allow other families than estimator and transformer. Handle the "else" case later...
    if (node["family"] == NodeFamilyTypes.Estimator.value):
        class_name = node["estimator_name"]
    elif (node["family"] == NodeFamilyTypes.Transformer.value):
        class_name = node["transformer_name"]

    mmi_part=[]
    for i in range(len(node["multi_instance_indicator"])):
        mmi_part.extend([node["multi_instance_indicator"][i] + "=" + "mmi_value_" + node["multi_instance_indicator"][i] + "_" + node["id"] + "[i]", ", "])

    arg_part = CodeGenerationUtils.handle_arguments(non_indicator_params, args)
    if (not bool(arg_part)):
        mmi_part.pop()

    code.extend(["stages_"+node["id"], ".append(", class_name + '('])
    code.extend(mmi_part)
    code.extend(arg_part)
    code.extend(["))", os.linesep])

    return ''.join(code)

def should_generate_multiple_instances(node):
    check=False
    if("multi_instance_indicator" in node):
        # Assuming that multi_instance_indicator parameter is at top level only.
        mii_param=node["parameters"][node["multi_instance_indicator"][0]]
        # check1 = isinstance(mii_param, list) and len(mii_param) > 1
        check1 = isinstance(mii_param["value"], list)
        check2 = mii_param["type"] in {"regex", "template", "ALL"}
        if(check1 or check2):
            check=True

    return check