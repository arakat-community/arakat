import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import React, { Component } from "react";

// interface ChartXY {
//  chart : am4charts.XYChart;
// }

/**
 * export xy chart
 */
class Welcome extends Component {

  public componentDidMount(): void {
    const chart = am4core.create("chartdiv", am4charts.XYChart);
    const data = [];

    chart.data = [{
      developer: "Burak Cagri Aktas",
      issues: 32,
    },            {
      developer: "Akın Kürşad Sam",
      issues: 34,
    },            {
      developer: "Murat Çatal",
      issues: 45,
    }];

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "developer";
    categoryAxis.title.text = "Developers";
    
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Issues done";

    const series = chart.series.push(new am4charts.ColumnSeries());

    series.dataFields.valueY = "issues";
    series.dataFields.categoryX = "developer";
    series.name = "Issues Done";
  }

  /**
   * div element html
   */
  public render(): JSX.Element {
    return (
      <div
        id="chartdiv"
        style={{
          width: "100%",
          height: "500px",
        }}
      >
      </div>
    );
  }
}

export default Welcome;
