import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import * as Am4core from "@amcharts/amcharts4/core";
import * as Am4Maps from "@amcharts/amcharts4/maps";
import { MapPolygon, MapPolygonSeries } from "@amcharts/amcharts4/maps";
import React, { PureComponent } from "react";
import { BaseChartProps } from "../../models/baseChartProps";
import { ProjectionType } from "../../models/enums/projectionType";
import { IMapConfig } from "../../models/mapChartModels/mapChartConfig";

export interface IMapChartSeriesProps<T> extends BaseChartProps {
    chartConfig: IMapConfig<T>;
}

/**
 * Pie Chart Series Component
 */
export class MapChartSeriesComponent<T> extends PureComponent<IMapChartSeriesProps<T>> {
    public chart: Am4Maps.MapChart;

    /**
     * Chart Initialization
     */
    public componentDidMount(): void {
        const { chartConfig, id } = this.props;
        const { tooltipText, exportable, projectionType } = chartConfig;
        const projection: Am4Maps.projections.Eckert6 | Am4Maps.projections.Mercator | Am4Maps.projections.Miller |
            Am4Maps.projections.Orthographic | Am4Maps.projections.Projection = null;

        this.chart = Am4core.create(this.props.id, Am4Maps.MapChart);

        if (this.props.chartConfig.exportable) {
            this.chart.exporting.menu = new Am4core.ExportMenu();
        }

        this.chart.geodata = am4geodata_worldLow;

        switch (projectionType) {
            case ProjectionType.ECKERT6:
                this.chart.projection = new Am4Maps.projections.Eckert6();
                break;

            case ProjectionType.MERCATOR:
                this.chart.projection = new Am4Maps.projections.Mercator();
                break;

            case ProjectionType.MILLER:
                this.chart.projection = new Am4Maps.projections.Miller();
                break;

            case ProjectionType.ORTHOGRAPHIC:
                this.chart.projection = new Am4Maps.projections.Orthographic();
                break;

            case ProjectionType.PROJECTION:
                this.chart.projection = new Am4Maps.projections.Projection();
                break;

            default:
                break;
        }

        const polygonSeries: MapPolygonSeries = this.chart.series.push(new Am4Maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        polygonSeries.mapPolygons.template.events.on("hit", (e) => {
            const res: any = e.target.dataItem.dataContext;
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

export default MapChartSeriesComponent;
