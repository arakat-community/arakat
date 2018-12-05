import * as am4core from "@amcharts/amcharts4/core";

export interface IStyle {
    fontSize?: number,                  // font size for all charts
    stroke?: string;                    // stroke for all charts
    fill?: string;                      // fill color for all charts
    fillOpacity?: number;               // fill opacity
    fontWeight?: am4core.FontWeight;    // font weight for all charts
    fillColor?: am4core.Color;          // fill color for all charts    
    strokeWidth?: number;               // stroke width
    innerRadius?: number;               // inner radius for pie charts
}