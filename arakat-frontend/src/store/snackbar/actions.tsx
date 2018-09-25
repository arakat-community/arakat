import {ActionCreator} from "redux";
import { ISnackbarMessage } from "../../common/models/snackbar/message";
import { IDisposeSnackbar, IShowSnackbar } from "./types";

export const showSnackbar: ActionCreator<IShowSnackbar> = (message: ISnackbarMessage) => ({
    payload: {
        message,
    },
    type: "@@snackbar/SHOW_SNACKBAR",
});

export const disposeSnackbar: ActionCreator<IDisposeSnackbar> = (id: string) => ({
    payload: {
        id,
    },
    type: "@@snackbar/DISPOSE_SNACKBAR",
});
