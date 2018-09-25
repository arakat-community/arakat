import {Reducer} from "redux";
import { ISnackbarMessage } from "../../common/models/snackbar/message";
import {ISnackbarMessagesState, SnackbarActions} from "./types";

export const initialState: ISnackbarMessagesState = {
    messages: [],
};

const reducer: Reducer<ISnackbarMessagesState> =
(state: ISnackbarMessagesState = initialState, action: SnackbarActions) => {
    switch (action.type) {
        case "@@snackbar/SHOW_SNACKBAR":
        const messages: ISnackbarMessage[] = [action.payload.message, ...state.messages];
        return {
            ...state,
            messages,
        };
        case "@@snackbar/DISPOSE_SNACKBAR":
        return {
            ...state,
            messages: state.messages.filter((message) => message.id !== action.payload.id),
        };
        default:
        return state;
    }
};

export default reducer;
