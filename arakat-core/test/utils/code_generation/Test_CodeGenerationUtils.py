import pytest

from src.utils.code_generation import CodeGenerationUtils

class TestCodeGenerationUtils(object):

    # Add tests for corner cases (e.g. None, Inf, empty lists, lists with mixed types~ etc.) later.. (I know that they will probably fail for now:))

    @pytest.mark.parametrize('value', ["Hello", "'Hi'"])
    def test_handle_primitive_for_string(self, value):
        assert CodeGenerationUtils.handle_primitive(value) == "\"" + value + "\""

    @pytest.mark.parametrize('value', [5, 5.4, -3, True])
    def test_handle_primitive_for_nonstring(self, value):
        assert CodeGenerationUtils.handle_primitive(value) == str(value)

    def test_handle_parameter_for_primitive(self, create_parameter_for_primitive, create_accompanying_arg_for_parameter):
        # parameter_val=create_parameter_for_primitive
        # arg_val=create_accompanying_arg_for_parameter
        # assert CodeGenerationUtils.handle_parameter(parameter_val, arg_val) == "\"" + str(parameter_val["value"]) + "\""
        expected_val = str(create_parameter_for_primitive["value"])
        if(isinstance(create_parameter_for_primitive["value"], str)):
            expected_val = "\"" + create_parameter_for_primitive["value"] + "\""

        assert CodeGenerationUtils.handle_parameter(create_parameter_for_primitive, create_accompanying_arg_for_parameter) == expected_val

    def test_handle_parameter_for_primitive_array(self, create_parameter_for_primitive_array, create_accompanying_arg_for_parameter):
        primitive_array=create_parameter_for_primitive_array["value"]
        code=["["]
        for elem in primitive_array:
            if (isinstance(elem, str)):
                code.append("\"" + elem + "\"")
            else:
                code.append(str(elem))
            code.append(", ")

        code.pop()

        code.append("]")
        expected_val=''.join(code)
        actual_val=CodeGenerationUtils.handle_parameter(create_parameter_for_primitive_array, create_accompanying_arg_for_parameter)

        assert all([a == b for a, b in zip(actual_val, expected_val)])