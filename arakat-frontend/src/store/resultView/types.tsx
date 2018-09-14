import {Action} from "redux";
import { IResultView } from "../../common/models/resultView/result";


export interface IResultViewState {
    reportResult: IResultView[];

}

export interface IDataRequestAttempt extends Action {
    type: "@@resultview/DATA_REQUEST_ATTEMPT";

}

export interface IDataReceived extends Action {
    type: "@@resultview/DATA_RECEIVED_SUCCESS";
    payload:{
        reportResult
    };
}

export interface IDataReceivedFailed extends Action {
    type: "@@resultview/DATA_RECEIVED_FAILED";
}

export type ResultViewActions = IDataReceived | IDataReceivedFailed | IDataRequestAttempt;