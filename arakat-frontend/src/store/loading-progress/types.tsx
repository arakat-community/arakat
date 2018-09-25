import {Action} from "redux";
import { LoadingProgressManagement } from "../../common/models/loading-progress/management";

export interface ILoadingProgressState {
    loading: boolean;
    management?: LoadingProgressManagement;
}

export interface ILoadingStarted extends Action {
    payload:{
        type?: LoadingProgressManagement;
    };
    type: "@@loading/STARTED";
}

export interface ILoadingFinished extends Action {
    type: "@@loading/FINISHED";
}

export type LoadingActions = ILoadingStarted | ILoadingFinished;
