import { DagState } from "../models/enums/dagState";

export interface App {
    id: number;
    appId: string;
    tasks: IAppTask[];
    stats?: IStat[];
}

export interface IAppTask {
    taskId: number;
    taskName: string;
    tablePaths: ITable[];
}

/**
 * Database table Models 
 */
export interface ITable {
    id: number;
    tablePath: string;
}

export interface IStat {
    color: string;
    count: number;
    state: DagState;
    dag_id: string;
}