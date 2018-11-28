import axios, { AxiosPromise, AxiosResponse } from "axios";
import Api from "../../../../config/api/index";
import Request from "../../../request"
import { ITableData, IRowData } from "../../../../models/databaseModels/tableOptions/tableInfo";

export const getData: (tablePath: string, columns: string, orderBy: string, limit: string, sortBy: string) => AxiosPromise<IRowData[]>
    = (tablePath, columns, orderBy, limit, sortBy) => new Request<IRowData>("", Api.BaseUrl + `get-data/${tablePath}/${columns}`).get<any>(
        {
            limit: limit,
            orderBy: orderBy,
            sortBy: sortBy
        }
    );

/* export const getData: () => AxiosPromise<ITableData>
    = () => new Request<ITableData>("", Api.MockUrl + `get-data/`).get<any>(); */
