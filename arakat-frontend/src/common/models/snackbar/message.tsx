import { SnackbarType } from "./type";

export interface ISnackbarMessage {
    messageId: string;
    type: SnackbarType;
    id: string;
}
