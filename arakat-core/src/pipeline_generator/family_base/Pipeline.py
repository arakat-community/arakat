import os

from src.utils.code_generation import MultiInstanceHandlerUtils

from src.domain.ErrorTypes import ErrorTypes
from src.domain.NodeFamilyTypes import NodeFamilyTypes
from src.domain.SharedFunctionTypes import SharedFunctionTypes
from src.utils.code_generation import CodeGenerationUtils
from src.validity import IncomingEdgeValidityChecker, PipelineValidityChecker


def generate_code(args):
    node = args["node"]
    requireds_info = args["requireds_info"]
    edges = args["edges"]

    final_code=[]
    shared_function_set = set()
    additional_local_code = []
    errors = []

    checklist={"df_count": {1}, "model_count": {0}}
    error, extra= IncomingEdgeValidityChecker.check_validity(node["id"], requireds_info, edges, checklist)
    if(error == ErrorTypes.NO_ERROR):
        error, pipeline_order= PipelineValidityChecker.check_validity(node["nodes"], node["edges"])
        if(error==ErrorTypes.NO_ERROR):
            if ("portion" in extra["dfs"][0]):
                df_name = "df_" + extra["dfs"][0]["source_id"] + "[" + str(extra["dfs"][0]["portion"]) + "]"
            else:
                df_name = "df_" + extra["dfs"][0]["source_id"]

            my_args = {"node_id": node["id"], "input_dfs": [df_name], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}
            gen_code, error = __generate_stages(node["nodes"], pipeline_order, df_name, my_args)
            if(error == ErrorTypes.NO_ERROR):
                gen_code.append(os.linesep)
                gen_code.extend(__generate_code_for_pipeline_instantination(node, pipeline_order, my_args))

                gen_code.extend(['model_' + node["id"] + "=" + 'pipeline_' + node["id"] + ".fit(" + df_name + ")", os.linesep])
                # Following might not be logical for pipelines with an estimator
                gen_code.extend(['df_' + node["id"] + "=" + 'model_' + node["id"] + '.transform(' + df_name + ')', os.linesep])

                final_code = CodeGenerationUtils.merge_with_additional_code(gen_code, additional_local_code)

    return final_code, shared_function_set, error

def __generate_code_for_pipeline_instantination(pipeline_node, pipeline_order, args):
    code=["stages_" + pipeline_node["id"] + "=["]
    need_flattening=False
    for node_id in pipeline_order:
        if(MultiInstanceHandlerUtils.should_generate_multiple_instances(pipeline_node["nodes"][node_id])):
            need_flattening=True
            if (pipeline_node["nodes"][node_id]["family"] == NodeFamilyTypes.ModelHolder.value):
                code.extend(["stages_" + pipeline_node["nodes"][node_id]["model_provider_id"], ", "])
            else:
                code.extend(["stages_" + node_id, ", "])
        else:
            if(pipeline_node["nodes"][node_id]["family"] == NodeFamilyTypes.ModelHolder.value):
                code.extend(["model_" + pipeline_node["nodes"][node_id]["model_provider_id"], ", "])
            else:
                code.extend(["pipeline_stage_"+ node_id, ", "])

    # We already validated that pipeline has at least one node.
    code.pop()
    code.extend(["]", os.linesep])

    if(need_flattening):
        args["shared_function_set"].add(SharedFunctionTypes.FLATTEN_IRREGULAR_LIST)
        code.extend(["stages_" + pipeline_node["id"] + " = [i for i in flatten(" + "stages_" + pipeline_node["id"] + ")]", os.linesep])

    code.extend(['pipeline_' + pipeline_node["id"] + "=Pipeline(stages=", "stages_" + pipeline_node["id"] , ")", os.linesep])

    return code

def __generate_stages(nodes, pipeline_order, df_name, args):
    code=[]
    error=ErrorTypes.NO_ERROR

    for node_id in pipeline_order:
        if (nodes[node_id]["family"] == NodeFamilyTypes.Estimator.value):
            code.extend(__generate_code_for_estimator_instantination(nodes[node_id], df_name, args))
        elif (nodes[node_id]["family"] == NodeFamilyTypes.Transformer.value):
            code.extend(__generate_code_for_transformer_instantination(nodes[node_id], df_name, args))

    return code, error

def __generate_code_for_estimator_instantination(node, df_name, args):
    if (MultiInstanceHandlerUtils.should_generate_multiple_instances(node)):
        args["in_pipeline"]=True
        return MultiInstanceHandlerUtils.multi_instance_generation(node, df_name, args)
    else:
        return CodeGenerationUtils.handle_instantination_or_call(node["parameters"], 'pipeline_stage_' + node["id"] + ' = ' + node["estimator_name"] + '(', args)

def __generate_code_for_transformer_instantination(node, df_name, args):
    if (MultiInstanceHandlerUtils.should_generate_multiple_instances(node)):
        args["in_pipeline"] = True
        return MultiInstanceHandlerUtils.multi_instance_generation(node, df_name, args)
    else:
        return CodeGenerationUtils.handle_instantination_or_call(node["parameters"], 'pipeline_stage_' + node["id"] + ' = ' + node["transformer_name"] + '(', args)
