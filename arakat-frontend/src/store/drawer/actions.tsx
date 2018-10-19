import {ActionCreator} from "redux";
import { INodeTree } from "../../common/models/node-tree";
import {
    IChangeDrawerIsOpen,
    IFetchNodeTree,
    INodeTreeFetched,
} from "./types";

export const changeDrawerIsOpen: ActionCreator<IChangeDrawerIsOpen> = (isOpen: boolean) => ({
    payload: {
        isOpen,
    },
    type: "@@drawer/CHANGE_DRAWER_ISOPEN",
});

export const fetchNodeTree: ActionCreator<IFetchNodeTree> = () => ({
    type: "@@drawer/FETCH_NODETREE",
});

export const nodeTreeFetched: ActionCreator<INodeTreeFetched> = (nodeTree: INodeTree) => ({
    payload: {
        nodeTree,
    },
    type: "@@drawer/NODETREE_FETCHED",
});
