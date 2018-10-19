import {Action} from "redux";
import { INodeTree } from "../../common/models/node-tree";

export interface IDrawerState {
    isOpen: boolean;
    nodeTree: INodeTree;
}

export interface IChangeDrawerIsOpen extends Action {
    payload: {
        isOpen: boolean,
    };
    type: "@@drawer/CHANGE_DRAWER_ISOPEN";
}

export interface IFetchNodeTree extends Action {
    type: "@@drawer/FETCH_NODETREE"
}

export interface INodeTreeFetched extends Action {
    payload: {
        nodeTree: INodeTree 
    },
    type: "@@drawer/NODETREE_FETCHED"
}

export type DrawerActions = IChangeDrawerIsOpen | IFetchNodeTree | INodeTreeFetched;