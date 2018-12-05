import { IBaseChartConfig } from "../baseChartConfig";
import { IStyle } from "../styles/xyChartStyle";

/**
 * Pie Chart Configurations Object
 */
export interface IPieChartConfig<T> extends IBaseChartConfig<T> {
    chartSeries: IPieChartSerie[];  // array contains pie chart serie objects
    is3D?: boolean;                  // 3d activation
}

/**
 * Chart Serie
 */
export interface IPieChartSerie {
    value: string;               // data to put value field
    category?: string;           // category of the pie chart
    title: string;               // name of the serie
    style?: IStyle;              // all style props for the added serie
    labelDisabled?: boolean;     // labels around chart to be displayed
    ticksDisabled?: boolean;     // ticks around chart to be displayed   
}

/**
 * Category Field
 */
export interface IPieCategory {
    field: string;   // category data field name
    text?: string;    // category title
}

/**
 * Value Field
 */
export interface IPieValue {
    text: string;               // category axis data field value
    oppositeRenderer?: boolean; // opposite value bar
}