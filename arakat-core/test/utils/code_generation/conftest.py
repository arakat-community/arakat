import pytest

@pytest.fixture(name="create_accompanying_arg_for_parameter", scope="session", params=[(1, "input_df", {}, {}, {})])
def create_accompanying_arg_for_parameter(request):
    return {"node_id": request.param[0], "input_dfs": [request.param[1]], "shared_function_set": request.param[2], "additional_local_code": request.param[3], "errors": request.param[4]}

@pytest.fixture(name="create_parameter_for_primitive", scope="session", params=[("string", "hello"), ("string", "hi"), ("integer", 5), ("integer", -3), ("double", 1.3), ("double", -3.2), ("double", 7), ("boolean", True)])
def create_parameter_for_primitive(request):
    return {"value": request.param[1], "type": request.param[0]}

@pytest.fixture(name="create_parameter_for_primitive_array", scope="session", params=[("array[string]", ["hello", "hi"]), ("array[integer]", [1, -1]), ("array[double]", [1.2, -1.2, 3.5]), ("array[boolean]", [False, True])])
def create_parameter_for_primitive_array(request):
    return {"value": request.param[1], "type": request.param[0]}