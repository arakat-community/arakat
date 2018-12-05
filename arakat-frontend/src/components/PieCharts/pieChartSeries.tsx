import * as am4charts from "@amcharts/amcharts4/charts";
import * as Am4Charts from "@amcharts/amcharts4/charts";
import * as Am4core from "@amcharts/amcharts4/core";
import React, { PureComponent } from "react";
import { BaseChartProps } from "../../models/baseChartProps";
import { IPieChartConfig } from "../../models/pieChartModels/pieChartConfig";

export interface IPieChartSeriesProps<T> extends BaseChartProps {
    chartConfig: IPieChartConfig<T>;
}

/**
 * Pie Chart Series Component
 */
export class PieChartSeriesComponent<T> extends PureComponent<IPieChartSeriesProps<T>> {
    public chart: am4charts.PieChart;

    /**
     * Chart Initialization
     */
    public componentDidMount(): void {
        const { chartSeries, is3D, data, fontSize } = this.props.chartConfig;
        const { innerRadius, fontWeight } = this.props.chartStyle;

        this.chart = Am4core.create(this.props.id, am4charts.PieChart);

        this.chart.data = data;
        this.chart.fontSize = fontSize ? fontSize : 20;
        this.chart.fontWeight = fontWeight ? fontWeight : "200";
        this.chart.innerRadius = Am4core.percent(innerRadius ? innerRadius : 1);

        this.chart.legend = new am4charts.Legend();

        chartSeries.forEach((chartSerie) => {
            let addedSerie: (Am4Charts.PieSeries | Am4Charts.PieSeries3D) = null;

            addedSerie = is3D ? this.chart.series.push(new am4charts.PieSeries()) :
                this.chart.series.push(new am4charts.PieSeries3D());

            addedSerie.labels.template.disabled = chartSerie.labelDisabled;
            addedSerie.ticks.template.disabled = chartSerie.ticksDisabled;

            addedSerie.dataFields.value = chartSerie.value;

            addedSerie.dataFields.category = chartSerie.category ?
                chartSerie.category : chartSerie.value;

            addedSerie.slices.template.stroke = chartSerie.style ?
                Am4core.color(chartSerie.style.fill) : Am4core.color("black");

            addedSerie.slices.template.strokeWidth = chartSerie.style ?
                chartSerie.style.strokeWidth : 2;
        });
    }
    /**
     * dispose chart component
     */
    public componentWillUnmount(): void {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    public componentWillMount(): void {
        console.log("will mount?: ");
    }

    /**
     * render ui outputs
     */
    public render(): JSX.Element {
        return (
            <div
                style={{ width: "100%", height: "100vh" }}
                id={this.props.id}>
            </div>
        );

    }
}

export default PieChartSeriesComponent;
