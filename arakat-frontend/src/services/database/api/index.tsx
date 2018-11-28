import axios, { AxiosPromise, AxiosResponse } from "axios";
import Api from "../../../config/api";
import Request from "../../request";
import { IDBMSModel } from "../../../models/chartDecision/chartDecisionTreeModel";


export const getDbmsArchitecture: () => AxiosPromise<IDBMSModel[]>
    = () => new Request<IDBMSModel>("", Api.BaseUrl + "get-all-apps-with-written-tables").get<any>();
