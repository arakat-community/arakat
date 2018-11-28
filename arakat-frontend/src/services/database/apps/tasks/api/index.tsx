import { AxiosPromise } from "axios";
import Api from "../../../../../config/api";
import Request from "../../../../request";

export const getTaskLogs: (appId: string, taskName: string) => AxiosPromise<string>
    = (appId, taskName) => new Request<string>("", Api.BaseUrl + `get-task-logs-from-spark/${appId}/${taskName}`).get<any>();