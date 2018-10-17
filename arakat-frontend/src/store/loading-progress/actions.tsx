import {ActionCreator} from "redux";
import { LoadingProgressManagement } from "../../common/models/loading-progress/management";
import { ILoadingFinished, ILoadingStarted } from "./types";

export const startLoadingProgress: ActionCreator<ILoadingStarted> = (managementType?: LoadingProgressManagement) => ({
    payload: {
        type: managementType,
    },
    type: "@@loading/STARTED",
});

export const finishLoadingProgress: ActionCreator<ILoadingFinished> = () => ({
    type: "@@loading/FINISHED",
});
