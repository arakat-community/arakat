import * as am4charts from "@amcharts/amcharts4/charts";
import * as Am4Charts from "@amcharts/amcharts4/charts";
import * as Am4core from "@amcharts/amcharts4/core";
import React, { PureComponent } from "react";
import { BaseChartProps } from "../../models/baseChartProps";
import { BulletType } from "../../models/enums/bulletType";
import { XYChartType } from "../../models/enums/xyChartType";
import { IBullet, IXYChartConfig } from "../../models/xyChartModels/xyChartConfig";

export interface IChartSeriesProps<T> extends BaseChartProps {
  chartConfig: IXYChartConfig<T>;
}

/**
 * Column Series Component
 */
export class XYChartSeriesComponent<T> extends PureComponent<IChartSeriesProps<T>> {
  public chart: am4charts.XYChart;

  /**
   * Chart Initialization
   */
  public componentDidMount(): void {
    const { chartStyle } = this.props;
    const { chartSeries, tooltipText, is3D, bullet, legend, value, categories } = this.props.chartConfig;

    this.chart = is3D ? Am4core.create(this.props.id, am4charts.XYChart3D) :
      Am4core.create(this.props.id, am4charts.XYChart);


    this.chart.data = this.props.chartConfig.data;
    this.chart.fontSize = this.props.chartStyle.fontSize;

    const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = categories[0].field;
    categoryAxis.title.text = categories[0].field;

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = value.text;

    if (legend) {
      this.chart.legend = new am4charts.Legend();
    }

    chartSeries.forEach((chartSerie) => {
      let addedSerie: (Am4Charts.ColumnSeries | Am4Charts.ColumnSeries3D |
        Am4Charts.LineSeries | Am4Charts.CandlestickSeries | Am4Charts.StepLineSeries) = null;

      switch (chartSerie.type) {

        case XYChartType.COLUMNSERIES:

          addedSerie = is3D ? this.chart.series.push(new am4charts.ColumnSeries3D())
            : this.chart.series.push(new am4charts.ColumnSeries());

          addedSerie.dataFields.valueY = value.text;
          addedSerie.dataFields.categoryX = categories[0].field;

          addedSerie.name = chartSerie.title;
          addedSerie.columns.template.tooltipText = tooltipText;
          addedSerie.columns.template.fill = Am4core.color(chartSerie.style.fill);

          addedSerie.stroke = Am4core.color(this.props.chartStyle.stroke);
          break;

        case XYChartType.LINESERIES:

          addedSerie = this.chart.series.push(new am4charts.LineSeries());

          addedSerie.name = chartSerie.title;
          addedSerie.stroke = Am4core.color(chartSerie.style.stroke ?
            chartSerie.style.stroke : Am4core.color("#CDA2AB")
          );
          addedSerie.strokeWidth = chartSerie.style.strokeWidth ? chartSerie.style.strokeWidth : 3;
          addedSerie.dataFields.categoryX = categories[0].field;
          addedSerie.dataFields.valueY = value.text;

          this.setBulletParameters(bullet, addedSerie);
          break;

        default:
          break;

      }
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

  /**
   * render ui outputs
   */
  public render(): JSX.Element {
    return (
      <div
        style={{ width: "100%", height: "50vh" }}
        id={this.props.id}>
      </div>
    );

  }

  private setBulletParameters = (bullet: IBullet, addedSerie: am4charts.LineSeries | am4charts.StepLineSeries) => {
    if (bullet) {
      const chartBullet: Am4Charts.Bullet = addedSerie.bullets.push(new Am4Charts.Bullet());
      let bulletType: (Am4core.Rectangle | Am4core.Circle | Am4core.Triangle | Am4core.Image) = null;
      const { direction, horizontalCenter, verticalCenter } = bullet.viewProperties;
      const { height, width, fill } = bullet.viewProperties;

      if (bullet.type) {
        switch (bullet.type) {

          case BulletType.RECTANGLE:
            bulletType = chartBullet.createChild(Am4core.Rectangle);
            break;

          case BulletType.CIRCLE:
            bulletType = chartBullet.createChild(Am4core.Circle);
            break;

          case BulletType.TRIANGLE:
            bulletType = chartBullet.createChild(Am4core.Triangle);
            chartBullet.propertyFields.rotation = "angle";
            bulletType.direction = direction;
            break;

          default:
            bulletType = chartBullet.createChild(Am4core.Circle);
            break;
        }
        bulletType.width = width ? width : 15;
        bulletType.height = height ? height : 15;
      } else {
        bulletType = chartBullet.createChild(Am4core.Image);
        bulletType.href = bullet.iconPath;
        bulletType.width = width ? width : 15;
        bulletType.height = height ? height : 15;
      }
      bulletType.horizontalCenter = horizontalCenter;
      bulletType.verticalCenter = verticalCenter;
      bulletType.fill = Am4core.color(fill);
    }
  }

}

export default XYChartSeriesComponent;
