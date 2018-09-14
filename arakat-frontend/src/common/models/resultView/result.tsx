import { status } from "./type";

export interface IResultView {
    name: string;
    status: status;
    time: Date;
    connectionType: [{}];
    log?: string;
}

