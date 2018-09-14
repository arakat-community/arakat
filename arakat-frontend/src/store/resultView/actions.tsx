import {ActionCreator} from "redux";
import { IResultView } from "../../common/models/resultView/result";
import { IDataReceived, IDataReceivedFailed, IDataRequestAttempt } from "./types";

export const dataReceived: ActionCreator<IDataReceived> = (reportResult: IResultView) => ({
    payload: {
        reportResult,
    },
    type: "@@resultview/DATA_RECEIVED_SUCCESS",
});

export const dataRequestAttempt: ActionCreator<IDataRequestAttempt> = () => ({

    type: "@@resultview/DATA_REQUEST_ATTEMPT",
});

export const dataReceivedFailed: ActionCreator<IDataReceivedFailed> = () => ({
    type: "@@resultview/DATA_RECEIVED_FAILED",
});
