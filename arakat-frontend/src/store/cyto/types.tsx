import {Action} from "redux";
import { INodeSpec } from "../../common/models/node-specs";
import { INodeOffset } from "../../common/models/cyto-elements/node-offset";


export interface ICytoState {
    nodeSpecs: INodeSpec[];
    cvNodesLength: number;
    pipelineNodesLength: number;
    taskNodesLength: number;
    existingNodes: INodeSpec[];
    lastDroppedNodeOffset: INodeOffset;
    isPrimitiveLevelLayoutRefreshBlocked: boolean;
}

export interface IFetchNodeSpecs extends Action {
    type: "@@cyto/FETCH_NODESPECS";
}  

export interface INodeSpecsFetched extends Action {
    payload: {
        nodeSpecs: INodeSpec[];
    },
    type: "@@cyto/NODESPECS_FETCHED";
}

export interface IAddNodeToExistingNodes extends Action {
    payload: {
        nodeSpec: INodeSpec;
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

export interface ISetLastDroppedNodeOffset extends Action {
    payload: {
        offset: INodeOffset;
    }
    type: "@@cyto/SET_LASTDROPPEDNODE_OFFSET";
}


export type CytoActions = IFetchNodeSpecs | INodeSpecsFetched | IAddNodeToExistingNodes |
                          IIncreaseTaskNodesLength | ISetLastDroppedNodeOffset | IIncreaseCVNodesLength |
                          IIncreasePipelineNodesLength;