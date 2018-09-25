import {Action} from "redux";
import {ISnackbarMessage} from "../../common/models/snackbar/message";

export interface ISnackbarMessagesState {
    messages: ISnackbarMessage[];
}

export interface IShowSnackbar extends Action {
    payload: {
        message: ISnackbarMessage,
    };
    type: "@@snackbar/SHOW_SNACKBAR";
}

export interface IDisposeSnackbar extends Action {
    payload: {
        id: string;
    };
    type: "@@snackbar/DISPOSE_SNACKBAR";
}

export type SnackbarActions = IShowSnackbar | IDisposeSnackbar;
