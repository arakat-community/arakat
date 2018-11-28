import axios, { AxiosPromise } from "axios";
import Api from "../../../config/api";
import Request from "../../request";
import { IChartDecisionTreeModel } from "../../../models/chartDecision/chartDecisionTreeModel";

export const getChartDecisionTree: () => AxiosPromise<IChartDecisionTreeModel[]>
    = () => new Request<IChartDecisionTreeModel>("", Api.MockUrl + "chart/decisionTree/tr").get<any>();