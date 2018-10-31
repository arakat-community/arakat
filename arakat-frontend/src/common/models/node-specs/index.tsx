export interface INodeSpec {
    data: any;
}

/*
    node_id: number; // but NodeMeta.node_id is string !?
    name: string;
    category: number; // but NodeMeta.node_id is string !?
    node_type: number;
    family: number;
    compatible_with_stream: boolean;
    compatible_stream_output_modes: "?";
    compatible_with_spark_pipeline: boolean;
    is_splitter: boolean;
    produces_model: boolean;
    parameter_props: {
        parameters: "?";
        relational_contraints: "?";
        visibility_constraints: "?"; 
    }
    df_constraints: "?"
    */

