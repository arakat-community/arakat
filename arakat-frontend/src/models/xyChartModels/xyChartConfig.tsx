import { IBaseChartConfig } from "../baseChartConfig";
import { XYChartType } from "../enums/xyChartType";
import { BulletType } from "../enums/bulletType";
import { IStyle } from "../styles/xyChartStyle";

/**
 * Chart Configurations Object
 */
export interface IXYChartConfig<T> extends IBaseChartConfig<T> {
    chartSeries: IXYChartSerie<T>[];    // chart series
    categories: IXYCategory[];          // category field
    is3D: boolean;                      // 3d activation
    bullet?: IBullet;                   // bullet settings
}

/**
 * Chart Serie
 */
export interface IXYChartSerie<T> {
    value: string;          // data to put y axis
    categoryX: string;      // x axis category name
    categoryY?: string;     // y axis category name 
    title: string;          // name of the serie
    type: XYChartType;      // chart serie type
    valueAxis?: IXYValue;   // value axis of the serie
    style?: IStyle;         // all style props for the added serie
}

/**
 * Category Field
 */
export interface IXYCategory {
    xAxisCategory: boolean; // is category to be placed in x axis? 
    field: string;          // category axis data field name
    text: string;           // category axis title
}

/**
 * Value Field
 */
export interface IXYValue {
    text: string;               // category axis data field value
    oppositeRenderer?: boolean; // opposite value bar
}

/**
 * Bullet configurations
 */
export interface IBullet {
    type?: BulletType;
    iconPath?: string;
    viewProperties?: IBulletStyle;
}

/**
 * Line Series Bullet style properties
 */
export interface IBulletStyle {
    direction?: "top" | "left" | "bottom" | "right";    // arrow direction    
    width?: number;                                     // width for bullet 
    height?: number;                                    // height for bullet
    fill?: string                                       // fill color of bullet
    horizontalCenter?: "middle";                        // element positioned in center
    verticalCenter?: "middle";                          // element positioned in vertical
}