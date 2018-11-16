from enum import Enum

class HighLevelNodeTypes(Enum):
    INNER_NODE=0
    TASK_NODE=1
    PIPELINE_NODE=2
    CV_NODE=3
    NO_NODE=4