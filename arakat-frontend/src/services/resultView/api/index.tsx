import axios, {AxiosPromise, AxiosResponse} from "axios";
import { IResultView } from "../../../common/models/resultView/result";
import Api from "../../../config/api";
import Request from "../../request";

export const fetchData: () => AxiosPromise<IResultView>
= () => new Request<IResultView>(Api.BaseURL, "/").get<IResultView>();
