import { ChartType } from "../models/enums/chartType/ChartType";

/**
 * User interaction decisions for the arakat to build a chart
 * IChartFormData is a form data set within welcome page and is passed to chart builder component 
 */
export interface IChartFormData {
    dataShowDecisionType: ChartType;

}