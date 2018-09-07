from domain.ErrorTypes import ErrorTypes
from domain.NodeFamilyTypes import NodeFamilyTypes
from utils import CodeGenerationUtils
from validity import IncomingEdgeValidityChecker, PipelineValidityChecker

import os

def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    code=[]
    checklist={"df_count": {1}, "model_count": {0}}
    error, extra=IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    if(error == ErrorTypes.NO_ERROR):
        error, pipeline_order=PipelineValidityChecker.check_validity(node["nodes"], node["edges"])
        if(error==ErrorTypes.NO_ERROR):
            code.extend(__generate_stages(node["nodes"], pipeline_order))
            code.append(os.linesep)
            code.extend(__generate_code_for_pipeline_instantination(node, pipeline_order))

            if (bool(extra["dfs"])):
                df_name = "df_" + extra["dfs"][0]
            else:
                df_name = "df_" + extra["portions"][0][0] + "[" + str(extra["portions"][0][1]) + "]"

            code.extend(['model_' + node["id"] + "=" + 'pipeline_' + node["id"] + ".fit(" + df_name + ")", os.linesep])
            # Following might not be logical for pipelines with an estimator
            code.extend(['df_' + node["id"] + "=" + 'model_' + node["id"] + '.transform(' + df_name + ')', os.linesep])

    return code, error

def __generate_code_for_pipeline_instantination(pipeline_node, pipeline_order):
    code=['pipeline_'+pipeline_node["id"] + "=Pipeline(stages=["]
    for node_id in pipeline_order:
        if(pipeline_node["nodes"][node_id]["family"] == NodeFamilyTypes.ModelHolder.value):
            code.extend(["model_" + pipeline_node["nodes"][node_id]["model_provider_id"], ", "])
        else:
            code.extend(["pipeline_stage_"+ node_id, ", "])

    # Might be an unnecessary check
    if (len(pipeline_order) > 0):
        code.pop()
    code.extend(["])", os.linesep])

    return code

def __generate_stages(nodes, pipeline_order):
    code=[]

    for node_id in pipeline_order:
        if (nodes[node_id]["family"] == NodeFamilyTypes.Estimator.value):
            code.extend(__generate_code_for_estimator_instantination(nodes[node_id]))
        elif (nodes[node_id]["family"] == NodeFamilyTypes.Transformer.value):
            code.extend(__generate_code_for_transformer_instantination(nodes[node_id]))

    return code


def __generate_code_for_estimator_instantination(node):
    code = ['pipeline_stage_' + node["id"] + ' = ' + node["estimator_name"] + '(']
    for param in node["parameters"]:
        code.extend([param + "=" + CodeGenerationUtils.arrange_parameter_value(node["parameters"][param]), ", "])
    if (len(node["parameters"]) > 0):
        code.pop()
    code.extend([")", os.linesep])
    return code

def __generate_code_for_transformer_instantination(node):
    code = ['pipeline_stage_' + node["id"] + ' = ' + node["transformer_name"] + '(']
    for param in node["parameters"]:
        code.extend([param + "=" + CodeGenerationUtils.arrange_parameter_value(node["parameters"][param]), ", "])
    if (len(node["parameters"]) > 0):
        code.pop()
    code.extend([")", os.linesep])
    return code