import axios, { AxiosPromise, AxiosResponse } from "axios";
import Api from "../../../../config/api/index";
import Request from "../../../request"
import { IColumnInformation } from "../../../../models/databaseModels/tableOptions/tableInfo";

export const getTableColumns: (tablePath: string) => AxiosPromise<IColumnInformation[]>
    = (tablePath) => new Request<IColumnInformation>("", Api.BaseUrl + `get-columns-by-table-path/${tablePath}`).get<any>();
