import { Reducer } from "redux";
import { CytoActions, ICytoState } from "./types";

export const initialState: ICytoState = {
    nodeSpecs: [],
    existingNodes: [],
    selectedNode: null,
    isDialogOpen: false,
    cvNodesLength: 0,
    pipelineNodesLength: 0,
    taskNodesLength: 0,
    lastDroppedNodeOffset: {
        x: 0,
        y: 0,
    },
    isPrimitiveLevelLayoutRefreshBlocked: false,
    edgePermissions: {},
    graph: undefined,
    graphNodes: {},
    graphEdges: {},
    graphProperties: undefined,
    isGraphPropertiesDialogOpen: false,
};

const reducer: Reducer<ICytoState> = (state: ICytoState = initialState, action: CytoActions) => {
    switch (action.type) {
        case "@@cyto/FETCH_NODESPECS":
            return {
                ...state,
            };
        case "@@cyto/NODESPECS_FETCHED":
            return {
                ...state,
                nodeSpecs: action.payload.nodeSpecs,
            };
        case "@@cyto/ADD_NODE_TO_EXISTINGNODES": {
            let newExistingNodes = [];
            if (state.existingNodes) {
                newExistingNodes = state.existingNodes;
            }
            newExistingNodes.push(action.payload.nodeSpec);
            return {
                ...state,
                existingNodes: newExistingNodes,
            };
        }
        case "@@cyto/INCREASE_CVNODES_LENGTH":
            const cvNodesLength = state.cvNodesLength + 1;
            return {
                ...state,
                cvNodesLength,
            };
        case "@@cyto/INCREASE_PIPELINENODES_LENGTH":
            const pipelineNodesLength = state.pipelineNodesLength + 1;
            return {
                ...state,
                pipelineNodesLength,
            };
        case "@@cyto/INCREASE_TASKNODES_LENGTH":
            const taskNodesLength = state.taskNodesLength + 1;
            return {
                ...state,
                taskNodesLength,
            };
        case "@@cyto/SET_LASTDROPPEDNODE_OFFSET":
            return {
                ...state,
                lastDroppedNodeOffset: action.payload.offset,
            };
        case "@@cyto/SET_SELECTEDNODE":
            return {
                ...state,
                selectedNode: action.payload.selectedNode,
            };
        case "@@cyto/SET_ISNODEPARAMETERSDIALOG_OPEN":
            return {
                ...state,
                isDialogOpen: action.payload.isDialogOpen,
            };
        case "@@cyto/ADD_NODE_TO_GRAPH_NODES":
            let newDagNodes = {};
            if (state.graphNodes) {
                newDagNodes = state.graphNodes;
            }
            newDagNodes[action.payload.node.id] = (action.payload.node);
            return {
                ...state,
                graphNodes: newDagNodes,
            };
        case "@@cyto/UPDATE_GRAPH_NODE":
            let updatedGraphNodes = {};
            if (state.graphNodes) {
                updatedGraphNodes = state.graphNodes;
            }
            updatedGraphNodes[action.payload.node.id] = action.payload.node;
            return {
                ...state,
                graphNodes: updatedGraphNodes,
            };
        case '@@cyto/ADD_EDGE_TO_GRAPH_EDGES':
            let newDagEdges = {};
            if (state.graphEdges) {
                newDagEdges = state.graphEdges;
            }
            newDagEdges[action.payload.key] = (action.payload.edge);
            return {
                ...state,
                graphEdges: newDagEdges,
            };
        case "@@cyto/FETCH_EDGEPERMISSIONS":
            return {
                ...state,
            };
        case "@@cyto/EDGEPERMISSIONS_FETCHED":
            return {
                ...state,
                edgePermissions: action.payload.edgePermissions
            }
        case '@@cyto/PREPARE_GRAPH':
            return {
                ...state,
                graph: action.payload.graph
            }
        case '@@cyto/SAVE_GRAPH':
            return {
                ...state,
            }
        case '@@cyto/SET_IS_GRAPH_PROPERTIES_DIALOG_OPEN':
            return {
                ...state,
                isGraphPropertiesDialogOpen: action.payload.isOpen,
            }
        case '@@cyto/SET_GRAPH_PROPERTIES':
            return {
                ...state,
                graphProperties: action.payload.graphProperties
            }
        default:
            return {
                ...state,
            };
    }
};

export default reducer;
