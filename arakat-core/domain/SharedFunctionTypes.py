from enum import Enum

class SharedFunctionTypes(Enum):
    COLUMN_MATCH_WITH_REGEX = 0
    COLUMN_MATCH_WITH_TEMPLATE = 1
    COLUMN_MATCH_WITH_ALL = 2
    SELECT_EXPR_HELPERS=3