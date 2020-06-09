import axios, { AxiosPromise, AxiosResponse } from "axios";
import Api from "../../../../../config/api";
import Request from "../../../../request";
import { App } from "../../../../../models/app";

export const getAllApps: () => AxiosPromise<App[]>
    = () => new Request<App>("", Api.BaseUrl + "get-all-apps").get<any>();
