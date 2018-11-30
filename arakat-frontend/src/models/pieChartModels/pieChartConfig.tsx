import { IBaseChartConfig } from "../baseChartConfig";
import { IStyle } from "../styles/xyChartStyle";

/**
 * Pie Chart Configurations Object
 */
export interface IPieChartConfig<T> extends IBaseChartConfig<T> {
    chartSeries: IPieChartSerie[];  // array contains pie chart serie objects
    category: IPieCategory;         // category of pie chart
    is3D: boolean;                  // 3d activation
}

/**
 * Chart Serie
 */
export interface IPieChartSerie {
    value: string;              // data to put y axis
    category: string;           // x axis name
    title: string;              // name of the serie
    valueAxis: IPieValue;       // value axis of the serie
    style?: IStyle;             // all style props for the added serie
    labelDisabled?: boolean;    // labels around chart to be displayed
    ticksDisabled?: boolean;    // ticks around chart to be displayed   
}

/**
 * Category Field
 */
export interface IPieCategory {
    field: string;   // category axis data field name
    text: string;    // category axis title
}

/**
 * Value Field
 */
export interface IPieValue {
    text: string;               // category axis data field value
    oppositeRenderer?: boolean; // opposite value bar
}