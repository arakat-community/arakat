import { AxiosPromise } from "axios";
import Api from "../../../../config/api";
import Request from "../../../request";
import { IStat } from "../../../../models/app";

export const getDagStats: (appId: string) => AxiosPromise<IStat[]>
    = (appId) => new Request<IStat>("", `${Api.BaseUrl}get-dag-stats-from-airflow/${appId}`).get<any>();
