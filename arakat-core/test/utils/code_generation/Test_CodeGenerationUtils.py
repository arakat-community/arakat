import pytest

from src.utils.code_generation import CodeGenerationUtils

class TestCodeGenerationUtils(object):

    @pytest.mark.parametrize('value', ["Hello", "'Hi'"])
    def test_handle_primitive_for_string(self, value):
        assert CodeGenerationUtils.handle_primitive(value) == "\"" + value + "\""

    @pytest.mark.parametrize('value', [5, 5.4, -3, True])
    def test_handle_primitive_for_nonstring(self, value):
        assert CodeGenerationUtils.handle_primitive(value) == str(value)