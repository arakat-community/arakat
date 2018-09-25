import {Reducer} from "redux";
import { ILoadingProgressState, LoadingActions } from "./types";

const initialState: ILoadingProgressState = {
    loading: false,
    management: null,
};

const reducer: Reducer<ILoadingProgressState> = (state: ILoadingProgressState = initialState, action: LoadingActions) => {
    switch (action.type) {
        case "@@loading/STARTED":
            return {
                ...state,
                loading: true,
                management: action.payload.type,
            };
        case "@@loading/FINISHED":
            return {
                ...state,
                loading: false,
                management: null,
            };
        default:
            return state;
    }
};

export default reducer;
