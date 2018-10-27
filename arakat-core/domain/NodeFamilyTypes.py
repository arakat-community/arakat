from enum import Enum

class NodeFamilyTypes(Enum):
    BatchReadFromFile = 0
    BatchReadFromKafka = 1
    BatchWriteToFile = 2
    BatchWriteToKafka = 3
    CrossValidator = 4
    DDFO = 5
    Estimator = 6
    Evaluator = 7
    Join = 8
    ModelApply = 9
    ModelLoad = 10
    ModelSave = 11
    Pipeline = 12
    RandomSplit = 13
    StreamReadFromFile = 14
    StreamReadFromKafka = 15
    StreamWriteToFile = 16
    StreamWriteToKafka = 17
    Transformer = 18
    ModelHolder = 19
    UDF = 20
    WindowFill = 21
    RollingStatistics = 22
    SelectExpr = 23
    Correlation = 24
    HypothesisTesting = 25
    SQL = 26
    When = 27
    VectorDisassembler=28