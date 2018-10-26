import {ActionCreator} from "redux";
import { INodeOffset } from "../../common/models/cyto-elements/node-offset";
import { INodeSpec } from "../../common/models/node-specs";
import {
    IAddNodeToExistingNodes,
    IFetchNodeSpecs,
    IIncreaseCVNodesLength,
    IIncreasePipelineNodesLength,
    IIncreaseTaskNodesLength,
    INodeSpecsFetched,
    ISetLastDroppedNodeOffset,
} from "./types";

export const fetchNodeSpecs: ActionCreator<IFetchNodeSpecs> = () => ({
    type: "@@cyto/FETCH_NODESPECS",
});

export const nodeSpecsFetched: ActionCreator<INodeSpecsFetched> = (nodeSpecs: INodeSpec[]) => ({
    payload: {
        nodeSpecs,
    },
    type: "@@cyto/NODESPECS_FETCHED",
});

export const addNodeToExistingNodes: ActionCreator<IAddNodeToExistingNodes> = (nodeSpec: INodeSpec) => ({
    payload: {
        nodeSpec,
    },
    type: "@@cyto/ADD_NODE_TO_EXISTINGNODES",
});

// "@@cyto/INCREASE_CVNODES_LENGTH"
export const increaseCVNodesLength: ActionCreator<IIncreaseCVNodesLength> = () => ({
    type: "@@cyto/INCREASE_CVNODES_LENGTH",
});
export const increasePipelineNodesLength: ActionCreator<IIncreasePipelineNodesLength> = () => ({
    type: "@@cyto/INCREASE_PIPELINENODES_LENGTH",
});
export const increaseTaskNodesLength: ActionCreator<IIncreaseTaskNodesLength> = () => ({
    type: "@@cyto/INCREASE_TASKNODES_LENGTH",
});

export const setLastDroppedNodeOffset: ActionCreator<ISetLastDroppedNodeOffset> = (offset: INodeOffset) => ({
    payload: {
        offset,
    },
    type: "@@cyto/SET_LASTDROPPEDNODE_OFFSET",
});
