import { Reducer } from "redux";
import { DrawerActions, IDrawerState } from "./types";

export const initialState: IDrawerState = {
    isOpen: false,
    nodeTree: {
        data: [],
    },
};

const reducer: Reducer<IDrawerState> = (state: IDrawerState = initialState, action: DrawerActions) => {
    switch (action.type) {
        case "@@drawer/CHANGE_DRAWER_ISOPEN":
            return {
                ...state,
                isOpen: action.payload.isOpen,
            };
        case "@@drawer/FETCH_NODETREE":
            return {
                ...state,
            };
        case "@@drawer/NODETREE_FETCHED":
            return {
                ...state,
                nodeTree: action.payload.nodeTree,
            };
        default:
            return {
                ...state,
            };
    }
};

export default reducer;
