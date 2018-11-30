import * as am4core from "@amcharts/amcharts4/core";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import ButtonType from "../common/models/button/type";
import { DialogState } from "../common/models/dialog/state";
import Button from "../components/button/index";
import { IChartDecisionTreeModel, ITable } from "../models/chartDecision/chartDecisionTreeModel";

import { IChartFormData } from "../models/IChartOptions";
import { IMapConfig } from "../models/mapChartModels/mapChartConfig";
import { IPieChartConfig } from "../models/pieChartModels/pieChartConfig";
import ChartDecisionFormComponent from "./decisionForm/form";
import DialogComponent from "./dialog";
import ShowChart from "@material-ui/icons/ShowChart";
import Assessment from "@material-ui/icons/Assessment";
import { IDBMSModel } from "../models/chartDecision/chartDecisionTreeModel";
import {
  Theme, WithStyles, withStyles,
} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAllApps } from "../services/chartDecision/dagStats/api";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Typography from '@material-ui/core/Typography';
import SvgComponent from "../components/dagState/dagState";
import classNames from 'classnames';
import { getChartDecisionTree } from "../services/chartDecision/api/index";
import { getTaskLogs } from "../services/database/apps/tasks/api/index";
import { App, IAppTask } from "../models/app";
import SelectComponent from "../components/Select";
import TableComponent from "../components/table/index";
import { ITableType } from "../models/tableComponent";
import { IStyle } from "../models/styles/xyChartStyle";

export interface IWelcomeProps {
  formData?: {};
  save?: (chartOption: IChartFormData) => void;
  update?: (chartOption: IChartFormData) => void;
}

interface IUserDialogViewState {
  chartDecisionDialogState: DialogState;
  showLogDialogState: DialogState;
  chartDecisionTree: IChartDecisionTreeModel[];
  drawChart: boolean;
  appList: App[];
  appModel: IDBMSModel;
  selectedApp: App;
  logText: string;
}

const styles: any = (theme: Theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  badge: {
    top: 1,
    right: -15,
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

type PropWithStyles = IWelcomeProps & WithStyles<"root" | "table" | "button" | "leftIcon" | "iconSmall">
  & InjectedIntlProps;

/**
 * export xy chart
 */
class ChartDecisionComponent extends Component<PropWithStyles, IUserDialogViewState> {
  public chartStyle: IStyle;
  public pieChartConfig: IPieChartConfig<any>;
  public mapChartConfig: IMapConfig<any>;
  public dataList: any[];

  constructor(props: PropWithStyles) {
    super(props);

    this.state = {
      chartDecisionTree: undefined,
      chartDecisionDialogState: DialogState.close,
      showLogDialogState: DialogState.close,
      drawChart: false,
      appList: [],
      appModel: undefined,
      selectedApp: undefined,
      logText: undefined,
    };
  }

  /**
   * component did mount
   * chart decision tree request method
   * get all apps request method
   */
  public componentDidMount(): void {
    getAllApps().then((response: any) => {
      response.forEach(element => {
        const app: App = element["app"];
        app.stats = element["dagStats"];
        this.setState(
          {
            appList: [...this.state.appList, app]
          }
        );
      });
    }).catch(error => {
      console.log(error);
    });

    getChartDecisionTree().then((response: any) => {
      this.setState(
        {
          chartDecisionTree: response,
        }
      );
    }).catch(error => {
      console.log(error);
    });
  }

  /**
   * component will mount
   */
  public componentWillMount(): void {

    this.dataList = [];

    this.chartStyle = {
      fontSize: 15,
      stroke: "#351647",
      fillColor: am4core.color("#ADD8E6"),
    };
  }

  /**
   * div element html
   */
  public render(): JSX.Element {

    const { chartDecisionDialogState, showLogDialogState } = this.state;
    const { classes } = this.props;
    return (
      <div>

        {
          this.state.appList.length > 0 &&
          <TableComponent
            headerKeyList={
              ["chartDecision.appName", "chartDecision.status",
                "chartDecision.log", "chartDecision.firstRunDate",
                "chartDecision.lastRunDate", ""
              ]
            }
            modelList={this.state.appList}
            type={ITableType.element}
            tableBody={this.createTableBody(this.state.appList)}
          />
        }

        {
          this.state.selectedApp &&
          <div style={{ marginTop: "10px" }}>
            {
              this.state.selectedApp &&
              <SelectComponent
                key={"chart-decision-task-select"}
                id={"chart-decision-task-select"}
                fullWidth={true}
                onSelect={this.taskHasSelected}
                options={this.state.selectedApp.tasks}
                primitiveType={true}
                optionKey={"taskName"}
                value={"taskName"}
                multipleSelection={false}
                placeHolder={"chartDecision.log.placeholder"}
              />
            }

            {
              this.state.logText &&
              <DialogComponent
                id="chart-decision-dialog"
                state={showLogDialogState}
                onClose={this.handleLogDialogClose}
                fullScreen={false}
                content={
                  <Paper className={classes.root} elevation={1}>
                    <Typography variant="title" component="h3">
                      <FormattedMessage
                        id={"chartDecision.log.logInfoLabel"}
                      />
                      {
                        " " + this.state.selectedApp.appId
                      }
                    </Typography>
                    <Typography component="p">
                      {
                        this.state.logText
                      }
                    </Typography>
                  </Paper>
                }>
              </DialogComponent>
            }
          </div>
        }

        {
          this.state.chartDecisionTree &&
          <DialogComponent
            id="chart-decision-dialog"
            state={chartDecisionDialogState}
            title="chartDecision.dialog.name"
            onClose={this.handleDialogClose}
            fullScreen={true}
            content={
              <ChartDecisionFormComponent
                chartDecisionTree={this.state.chartDecisionTree}
                appModel={this.state.appModel}
              />
            }>
          </DialogComponent>
        }
      </div>
    );
  }

  private createTableBody = (appList: App[]) => {
    const { classes } = this.props;
    const tableBody = appList.length > 0 &&
      appList.map(app => {
        return (
          <TableRow key={app.appId}>

            <TableCell component="th" scope="row">
              {app.appId}
            </TableCell>

            <TableCell component="th" scope="row">
              {
                app.stats &&
                <SvgComponent
                  gList={app.stats}
                />
              }

            </TableCell>

            <TableCell component="th" scope="row">
              <Button
                variant="flat"
                type={ButtonType.action}
                className={classes.button}
                onClick={this.handleShowLog.bind(this, app)}
              >
                <Assessment className={classNames(classes.leftIcon, classes.iconSmall)} />
              </Button>
            </TableCell>

            <TableCell component="th" scope="row">

            </TableCell>

            <TableCell component="th" scope="row">

            </TableCell>

            <TableCell component="th" scope="row">
              <Button
                variant="outlined"
                label={"chartDecision.form.drawChart"}
                type={ButtonType.action}
                className={classes.button}
                onClick={this.handleShowChartDecision.bind(this, app)}
              >
                <ShowChart className={classNames(classes.leftIcon, classes.iconSmall)} />
              </Button>
            </TableCell>

          </TableRow>
        );
      });
    return tableBody;
  }

  /**
   * task selected handle method
   * @param selectedItem is the selected task item
   * gets selected task's logs with service call
   * and sets the state to display log information on dialog
   */
  private taskHasSelected = (selectedItem: IAppTask) => {
    getTaskLogs(this.state.selectedApp.appId, selectedItem.taskName).then((response: any) => {
      this.setState(
        {
          logText: response,
          showLogDialogState: DialogState.open,
        }
      );
    });
  }

  /**
   * click handle method for show log button
   * @param app current app item on table
   * sets state's selectedApp object
   */
  private handleShowLog = (app: App) => {
    this.setState(
      {
        selectedApp: app,
      }
    );
  }

  /**
   * handle click method for the chart decision button
   * @param app is the current app in the table view
   * opens the chart decision dialog
   */
  private handleShowChartDecision = (app: App) => {
    const appModel: IDBMSModel = {
      appId: "",
      tablePathList: []
    };
    app.tasks.forEach((task: IAppTask) => {
      task.tablePaths.forEach((table: ITable) => {
        appModel.appId = app.appId;
        appModel.tablePathList.push(table);
      });
    });
    this.setState(
      {
        chartDecisionDialogState: DialogState.open,
        appModel: appModel,
      }
    );
  }

  /**
   * handle close on chart decision dialog
   */
  private handleDialogClose = () => {
    this.setState({
      chartDecisionDialogState: DialogState.close,
    });
  }

  /**
   * handle close on show log information dialog
   */
  private handleLogDialogClose = () => {
    this.setState({
      showLogDialogState: DialogState.close,
      selectedApp: undefined,
    });
  }

}
export default withStyles(styles, { withTheme: true })(injectIntl(ChartDecisionComponent));