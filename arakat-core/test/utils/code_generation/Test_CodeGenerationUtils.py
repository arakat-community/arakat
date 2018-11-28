import pytest

from src.utils.code_generation import CodeGenerationUtils

@pytest.mark.parametrize('value', ["hello", "'good'"])
def test_handle_primitive_for_string(value):
    assert CodeGenerationUtils.handle_primitive(value) == "\"" + value + "\""

# @pytest.mark.parametrize('value', [5, 5.4, -3, True])
# def test_handle_primitive_for_nonstring(self, value):
#     assert 1 == 0