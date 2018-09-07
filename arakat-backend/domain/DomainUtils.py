from HighLevelNodeTypes import HighLevelNodeTypes
from NodeFamilyTypes import NodeFamilyTypes

__compound_nodes = {HighLevelNodeTypes.PIPELINE_NODE.value, HighLevelNodeTypes.CV_NODE.value}
__nodes_without_incoming_edges={NodeFamilyTypes.BatchReadFromFile.value, NodeFamilyTypes.BatchReadFromKafka.value, NodeFamilyTypes.StreamReadFromFile.value, NodeFamilyTypes.StreamReadFromKafka.value, NodeFamilyTypes.ModelLoad.value}
# __datasource_nodes={NodeFamilyTypes.BatchReadFromFile, NodeFamilyTypes.BatchReadFromKafka, NodeFamilyTypes.StreamReadFromFile, NodeFamilyTypes.StreamReadFromKafka}
__privilaged_nodes_for_pipeline={70}
# Limited the data types for now.
# We should be able to support data types in pyspark.sql.types; but I haven't included all since their effects should be checked in detail.
__allowed_data_types={"StringType", "BinaryType", "BooleanType", "DateType",
    "TimestampType", "DoubleType", "FloatType", "ByteType", "IntegerType",
    "LongType", "ShortType", "ArrayType"}

def is_compound(node_type):
    return node_type in __compound_nodes

def requires_incoming_edge(family):
    return not (family in __nodes_without_incoming_edges)

def is_data_type_allowed(data_type):
    return data_type in __allowed_data_types

def get_node_family_name(family_value):
    return str(NodeFamilyTypes(family_value)).split(".")[1]

def has_privilage_for_pipeline(node_id):
    return node_id in __privilaged_nodes_for_pipeline