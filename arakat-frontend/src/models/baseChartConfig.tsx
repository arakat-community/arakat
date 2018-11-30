import { LegendPosition } from "../models/enums/legendPosition";
import { ChartGroupType } from "../models/enums/chartType";

/**
 * Base Chart Configuration Model
 */
export interface IBaseChartConfig<T> {
    data: T[];                          // data to display inside chart or map 
    chartType: ChartGroupType;          // chart group type (pie chart, xy chart etc..)
    tooltipText?: string;               // tooltip text of the chart or map
    exportable?: boolean;               // export as pdf, word etc..
    fontSize?: number;                  // font size of the map or chart
    legend?: IChartLegendConfig;        // legend settings    
}

/**
 * legend configuration interface
 */
export interface IChartLegendConfig {
    // TODO there will be more insights about it later..
    position: LegendPosition;
}
