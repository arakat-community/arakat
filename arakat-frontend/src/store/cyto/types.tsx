import {Action} from "redux";
// import { INodeSpec } from "../../common/models/node-specs";
import { INodeOffset } from "../../common/models/cyto-elements/node-offset";


export interface ICytoState {
    nodeSpecs: any[];
    existingNodes: any[];
    selectedNode: any;
    isDialogOpen: boolean;
    cvNodesLength: number;
    pipelineNodesLength: number;
    taskNodesLength: number;
    lastDroppedNodeOffset: INodeOffset;
    isPrimitiveLevelLayoutRefreshBlocked: boolean;
    edgePermissions: any;
    graph: any;
    graphNodes: any;
    graphEdges: any;
    graphProperties: any;
    isGraphPropertiesDialogOpen: boolean;
}
export interface ISetIsDagPropertiesDialogOpen extends Action {
    payload: {
        isOpen: boolean;
    },
    type: '@@cyto/SET_IS_GRAPH_PROPERTIES_DIALOG_OPEN'
}
export interface IFetchNodeSpecs extends Action {
    type: "@@cyto/FETCH_NODESPECS";
}  

export interface INodeSpecsFetched extends Action {
    payload: {
        nodeSpecs: any[];
    },
    type: "@@cyto/NODESPECS_FETCHED";
}

export interface IAddNodeToExistingNodes extends Action {
    payload: {
        nodeSpec: any;
    },
    type: "@@cyto/ADD_NODE_TO_EXISTINGNODES";
}

export interface IIncreaseCVNodesLength extends Action {
    type: "@@cyto/INCREASE_CVNODES_LENGTH";
}

export interface IIncreasePipelineNodesLength extends Action {
    type: "@@cyto/INCREASE_PIPELINENODES_LENGTH";
}

export interface IIncreaseTaskNodesLength extends Action {
    type: "@@cyto/INCREASE_TASKNODES_LENGTH";
}

export interface ISetSelectedNode extends Action {
    payload: {
        selectedNode: any;
    }
    type: "@@cyto/SET_SELECTEDNODE";
}

export interface ISetIsNodeParametersDialogOpen extends Action {
    payload: {
        isDialogOpen: boolean;
    }
    type: "@@cyto/SET_ISNODEPARAMETERSDIALOG_OPEN";
}

export interface ISetLastDroppedNodeOffset extends Action {
    payload: {
        offset: INodeOffset;
    }
    type: "@@cyto/SET_LASTDROPPEDNODE_OFFSET";
}

export interface IAddNodeToGraphNodes extends Action {
    payload: {
        node: any;
    }
    type: "@@cyto/ADD_NODE_TO_GRAPH_NODES";
}

export interface IUpdateGraphNode extends Action {
    payload: {
        node: any;
        index: number;
    }
    type: "@@cyto/UPDATE_GRAPH_NODE";
}

export interface IAddEdgeToGraphEdges extends Action {
    payload: {
        key: string;
        edge: any;
    }
    type: "@@cyto/ADD_EDGE_TO_GRAPH_EDGES";
}

export interface IFetchEdgePermissions extends Action {
    type: "@@cyto/FETCH_EDGEPERMISSIONS"
}

export interface IEdgePermissionsFetched extends Action {
    payload: {
        edgePermissions: any; 
    },
    type: "@@cyto/EDGEPERMISSIONS_FETCHED"
}

export interface ISetGraph extends Action {
    payload: {
        graph: any
    },
    type: '@@cyto/PREPARE_GRAPH'
}

export interface ISaveGraph extends Action {
    payload: {
        graph: any;
    },
    type: '@@cyto/SAVE_GRAPH'
}

export interface ISetDagProperties extends Action {
    payload: {
        graphProperties
    },
    type: '@@cyto/SET_GRAPH_PROPERTIES'
}

export type CytoActions = IFetchNodeSpecs | INodeSpecsFetched | IAddNodeToExistingNodes |
                          IIncreaseTaskNodesLength | ISetLastDroppedNodeOffset | IIncreaseCVNodesLength |
                          IIncreasePipelineNodesLength | ISetSelectedNode | ISetIsNodeParametersDialogOpen |
                          IAddNodeToGraphNodes | IUpdateGraphNode | IFetchEdgePermissions | IEdgePermissionsFetched |
                          IAddEdgeToGraphEdges | ISetGraph | ISetIsDagPropertiesDialogOpen | ISetDagProperties |
                          ISaveGraph;