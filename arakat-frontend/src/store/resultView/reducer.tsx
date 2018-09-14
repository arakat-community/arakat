import {Reducer} from "redux";
import { IResultView } from "../../common/models/resultView/result";
import {IResultViewState, ResultViewActions} from "./types";

export const initialState: IResultViewState = {
    reportResult: null,
};

const reducer: Reducer < IResultViewState > = (state: IResultViewState = initialState, action: ResultViewActions) => {
    switch (action.type) {
        case "@@resultview/DATA_RECEIVED_SUCCESS":
            return {
                ...state,
                reportResult: action.payload.reportResult,
            };
        case "@@resultview/DATA_REQUEST_ATTEMPT":
            return {
                reportResult: null,
                ...state,
            };
        default:
            return state;
    }
};

export default reducer;
