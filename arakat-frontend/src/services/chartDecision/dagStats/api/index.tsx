import axios, { AxiosPromise } from "axios";
import Api from "../../../../config/api";
import Request from "../../../request";
import { App, IStat } from "../../../../models/app";

export const getAllApps: () => AxiosPromise<App[]>
    = () => new Request<App>(Api.BaseUrl, "/get-all-apps").get<any>();

export const getDagStats: (appId: string) => AxiosPromise<IStat[]>
    = (appId) => new Request<IStat>(Api.BaseUrl, `get-dag-stats-from-airflow/${appId}`).get<any>();
