import { SnackbarType } from "./type";

export interface ISnackbarMessage {
    message: string;
    type: SnackbarType;
    id: string;
}