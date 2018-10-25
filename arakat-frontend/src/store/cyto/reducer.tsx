import { Reducer } from "redux";
import { CytoActions, ICytoState } from "./types";

export const initialState: ICytoState = {
    nodeSpecs: [],
    existingNodes: [],
    cvNodesLength: 0,
    pipelineNodesLength: 0,
    taskNodesLength: 0,
    lastDroppedNodeOffset: {
        x: 0,
        y: 0,
    },
    isPrimitiveLevelLayoutRefreshBlocked: false,
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
            const cvNodesLength = state.taskNodesLength + 1;
            return {
                ...state,
                cvNodesLength,
            };
        case "@@cyto/INCREASE_PIPELINENODES_LENGTH":
            const pipelineNodesLength = state.taskNodesLength + 1;
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
        default:
            return {
                ...state,
            };
    }
};

export default reducer;
