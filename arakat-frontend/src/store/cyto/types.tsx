import {Action} from "redux";
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
    loadedGraphs: any[];
    graph: any;
    isGraphLoaded: boolean;
    graphNodes: any;
    graphEdges: any;
    graphProperties: any;
    isGraphPropertiesDialogOpen: boolean;
    isLoadedGraphsDialogOpen: boolean;
    isAboutToRun: boolean;
    isAboutToSave: boolean;
    

}
export interface ISetIsGraphPropertiesDialogOpen extends Action {
    payload: {
        isOpen: boolean;
    },
    type: '@@cyto/SET_IS_GRAPH_EXECUTE_DIALOG_OPEN'
}

export interface ISetIsAboutToRun extends Action {
    payload: {
        isAboutToRun: boolean;
    },
    type: '@@cyto/SET_IS_ABOUT_TO_RUN'
}

export interface ISetIsAboutToSave extends Action {
    payload: {
        isAboutToSave: boolean;
    },
    type: '@@cyto/SET_IS_ABOUT_TO_SAVE'
}

export interface ISetIsGraphPropertiesDialogOpen extends Action {
    payload: {
        isOpen: boolean;
    },
    type: '@@cyto/SET_IS_GRAPH_EXECUTE_DIALOG_OPEN'
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

export interface ISetIsLoadedGraphsDialogOpen extends Action {
    payload: {
        isOpen: boolean;
    }
    type: "@@cyto/SET_IS_LOADED_GRAPHS_DIALOG_OPEN";
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
    type: '@@cyto/SET_GRAPH'
}

export interface IRunGraph extends Action {
    payload: {
        graph: any;
    },
    type: '@@cyto/RUN_GRAPH'
}

export interface ISaveGraph extends Action {
    payload: {
        graph: any;
    },
    type: '@@cyto/SAVE_GRAPH'
}

export interface IFetchGraphs extends Action {
    type: '@@cyto/FETCH_GRAPHS'
}

export interface IFetchGraph extends Action {
    type: '@@cyto/FETCH_GRAPH'
}

export interface IGraphsFetched extends Action {
    payload: {
        graphs: any[];
    },
    type: '@@cyto/GRAPHS_FETCHED'
}

export interface IGraphFetched extends Action {
    payload: {
        graph: any;
    },
    type: '@@cyto/GRAPH_FETCHED'
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
                          IAddEdgeToGraphEdges | ISetGraph | ISetIsGraphPropertiesDialogOpen | ISetDagProperties |
                          IRunGraph | ISaveGraph | ISetIsAboutToRun | ISetIsAboutToSave | IFetchGraphs | IFetchGraph |
                          IGraphsFetched | IGraphFetched | ISetIsLoadedGraphsDialogOpen;