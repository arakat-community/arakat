import {
    Grid, Theme, WithStyles, withStyles,
    FormControl, Input, InputLabel
} from "@material-ui/core";
import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import { InjectedIntlProps, injectIntl, FormattedRelative } from "react-intl";
import SelectComponent from "../../components/Select";
import {
    IChartDecisionTreeModel,
    ISelectedIDBMSModel,
    IDBMSModel
} from "../../models/chartDecision/chartDecisionTreeModel";
import { ITreeDataModel } from "../../models/chartDecision/chartDecisionTreeModel";
import RCTreeComponent from "../../components/decisionForm/RCTreeComponent";
import { NodeType } from "../../models/enums/nodeType";
import { IColumnInformation, IRowData, IColumnData, ITableData } from "../../models/databaseModels/tableOptions/tableInfo";
import { InternalTreeNode } from "rc-tree";
import { getTableColumns } from "../../services/database/databaseColumn/api/index";
import SwapVert from "@material-ui/icons/SwapVert";
import SaveIcon from "@material-ui/icons/Save";
import cloneDeep from "lodash/cloneDeep";
import classNames from 'classnames';
import { ChartType } from "../../models/enums/chartType/ChartType";
import Button from "../../components/button/index";
import { FormattedMessage } from "react-intl";
import ButtonType from "../../common/models/button/type";
import { getData } from "../../services/database/databaseTable/api";
import { ChartGroupType } from "../../models/enums/chartType";
import { LegendPosition } from "../../models/enums/legendPosition";
import { XYChartType } from "../../models/enums/xyChartType";
import { MapChartSeriesComponent } from "../MapChart/mapChartSeries";
import { PieChartSeriesComponent } from "../PieCharts/pieChartSeries";
import { XYChartSeriesComponent } from "../XYCharts/xyChartSeries";
import { IStyle } from "../../models/styles/xyChartStyle";

interface IFormProps {
    chartDecisionTree: IChartDecisionTreeModel[];
    appModel: IDBMSModel;
}

interface IFormComponentState {
    chartDecisionSelectList: JSX.Element[];             // holds chart decision select box array
    selectedColumnsInputList?: JSX.Element[];
    selectedChartDecision?: IChartDecisionTreeModel;    // selected chart decision item in the tree
    treeData?: ITreeDataModel[];                        //     
    columnInformation?: IColumnInformation[];
    selectedDBMSModelList?: ISelectedIDBMSModel[];
    selectedIndex?: number;
    hasLeafChanged?: boolean;
    limit?: string;
    selectedOrderBy?: string;
    components: JSX.Element[];
}

const style: any = (theme: Theme) => ({
    select: {
        color: "#000",
        height: 40,
        width: 400,
        marginLeft: 8,
        marginTop: 8,
        fontWeight: 700,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    input: {
        margin: theme.spacing.unit,
    },
});

type PropWithStyles = IFormProps
    & WithStyles<"select" | "button" | "leftIcon" | "rightIcon" | "iconSmall" | "paper" | "input">
    & InjectedIntlProps;

export const cloneObj: any = (data: any) => (cloneDeep(data));

/**
 * Chart Decision Form Component
 */
class ChartDecisionFormComponent extends Component<PropWithStyles, IFormComponentState, {}> {
    public chartStyle: IStyle;
    constructor(props: PropWithStyles) {
        super(props);
        this.state = {
            chartDecisionSelectList: [],
            selectedChartDecision: undefined,
            treeData: undefined,
            selectedDBMSModelList: [],
            selectedIndex: 0,
            hasLeafChanged: false,
            limit: "",
            selectedOrderBy: "",
            components: [],
        };
    }

    defaults = {
        props: {
            children: "children"
        }
    }

    /**
     * component did mount
     */
    public componentDidMount(): void {
        const { chartDecisionTree } = this.props;
        this.chartStyle = {
            fontSize: 15,
            stroke: "#351647",
            fillColor: am4core.color("#ADD8E6"),
        }
        this.setState(
            {
                selectedChartDecision: undefined,
                chartDecisionSelectList: [...this.state.chartDecisionSelectList, this.createSelectMenu(
                    this.handleChartDecisionChange,
                    chartDecisionTree,
                    "-1", "id", "name", false,
                    "chartDecision.form.placeholder.chartDecisionItem"
                )],
            },
        );
    }

    /**
     * render ui outputs
     */
    public render(): JSX.Element {
        const { classes } = this.props;
        return (
            <Grid
                container={true}
            >
                <Grid
                    item={true}
                    xs={12}
                >
                    {
                        this.state.chartDecisionSelectList
                    }
                </Grid>

                <Grid
                    container={true}
                >
                    <Grid
                        item={true}
                        xs={12}
                    >
                        {
                            this.state.treeData &&
                            this.createRCTree()
                        }
                    </Grid>

                    <Grid
                        item={true}
                        xs={12}
                    >
                        {
                            this.state.treeData &&
                            this.state.selectedColumnsInputList
                        }

                        {
                            this.state.selectedDBMSModelList.length >= 1 &&
                            this.createSelectMenu(
                                this.handleOrderBySelection,
                                this.createSelectedColumnArray(),
                                "selected-fields-menu", "id", "name", false,
                                "chartDecision.form.selectedColumnMenu.label"
                            )
                        }

                        {
                            this.state.selectedDBMSModelList.length >= 1 &&
                            <FormControl fullWidth className={classes.input}>
                                <InputLabel >
                                    {
                                        <FormattedMessage
                                            id="chartDecision.form.limit"
                                        />
                                    }
                                </InputLabel>
                                <Input
                                    key={"limit-input-label"}
                                    id={"limit-input-label"}
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                    onChange={this.handleLimitChange}
                                    value={this.state.limit}
                                />
                            </FormControl>

                        }

                        {
                            this.state.limit &&
                            <Button
                                variant="outlined"
                                label={"chartDecision.form.drawChart"}
                                type={ButtonType.action}
                                className={classes.button}
                                onClick={this.handleDrawChart}>
                                <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                            </Button>
                        }


                    </Grid>
                </Grid>
                <Grid
                    item={true}
                    xs={12}
                >
                    {
                        this.state.components
                    }
                </Grid>
            </Grid>
        );
    }

    private handleLimitChange = (event: any) => {
        this.setState(
            {
                limit: event.target.value
            }
        );
    }

    private handleOrderBySelection = (selectedItem: any) => {
        this.setState(
            {
                selectedOrderBy: selectedItem["name"]
            }
        );
    }

    /**
     * Callback function of the draw chart button
     * service call to obtain table data
     * create chart series component and render it.
     */
    private handleDrawChart = () => {
        // draw chart method
        // method will get the table information with axios
        // chart series component will be rendered here
        let columns: string = "";
        let tablePathQueryStr: string = "";
        const { selectedDBMSModelList } = this.state;
        selectedDBMSModelList.forEach(selectedDBMSModel => {
            const { column, tablePath } = selectedDBMSModel;
            tablePathQueryStr = encodeURIComponent(tablePath).replace(/%/g, '%25');

            columns = selectedDBMSModelList.indexOf(selectedDBMSModel) === selectedDBMSModelList.length - 1 ?
                columns + column.name : columns + column.name + ",";

            console.log("table path and columns : ", tablePathQueryStr, columns);
        });

        getData(tablePathQueryStr, columns, this.state.selectedOrderBy,
            this.state.limit, "ASC").then((response: any) => {
                console.log("get data service call completed : ", response);
                this.drawChart(response);
            });
        /*     getData().then((response: any) => {
                console.log("get data service call completed : ", response);
                this.drawChart(response);
            }); */
    }

    /**
     * Region Handle Click Methods
     * Handles the check on tree data
     * @param checkedTreeKeys keys checked inside tree data component
     */
    private onSelected = (checkedTreeKeys: string[]) => {
        const selectedDBMSModelList: ISelectedIDBMSModel[] = [];
        const chartType = this.state.selectedChartDecision.key;

        if ((chartType === ChartType.COLUMN_CHART
            || chartType === ChartType.LINE_CHART) && checkedTreeKeys.length === 2) {

            checkedTreeKeys.forEach(
                checkedTreeKey => {
                    const selectedDBMSModel: ISelectedIDBMSModel = {
                        appId: checkedTreeKey.split("-")[0],
                        tablePath: checkedTreeKey.split("-")[1],
                        column: {
                            name: checkedTreeKey.split("-")[2],
                        },
                    };
                    selectedDBMSModelList.push(selectedDBMSModel);
                }
            );
            this.setState(
                {
                    selectedDBMSModelList: selectedDBMSModelList,
                }
            );
            this.getSelectedColumnsInputList(selectedDBMSModelList);
        }

        else if (chartType === ChartType.PIE_CHART
            && checkedTreeKeys.length === 1) {
            checkedTreeKeys.forEach(
                checkedTreeKey => {
                    const selectedDBMSModel: ISelectedIDBMSModel = {
                        appId: checkedTreeKey.split("-")[0],
                        tablePath: checkedTreeKey.split("-")[1],
                        column: {
                            name: checkedTreeKey.split("-")[2],
                        },
                    };
                    selectedDBMSModelList.push(selectedDBMSModel);
                }
            );
            this.setState(
                {
                    selectedDBMSModelList: selectedDBMSModelList,
                }
            );
        }
    }

    /**
     * on Data load callback function of the rc-tree component
     * @param treeNode is the node to be loaded 
     */
    private onRCTreeDataLoad = (treeNode: InternalTreeNode) => {
        return new Promise((resolve) => {
            const currentItem: ITreeDataModel = cloneObj(this.getItem(this.state.treeData, treeNode, (touchedNode: any, myNode: any) =>
                treeNode.props.eventKey === touchedNode.key));

            const { type } = currentItem;

            if (type === NodeType.TABLE) {
                this.getColumnsByTablePath(currentItem);
                resolve();
            }
        });
    }

    /**
     * Handles the click on base refraction of draw chart decision tree
     * @param selectedItem is selected input box equals to IChartDecisionTreeModel tree node  
     * @param id unused
     */
    private handleChartDecisionChange = (selectedItem: IChartDecisionTreeModel) => {
        const hasChildren = selectedItem.children !== undefined;
        this.setState({
            treeData: undefined
        }, () => {
            this.checkSelectBoxConditions(selectedItem);

            if (hasChildren) {
                this.setState(
                    {
                        selectedChartDecision: selectedItem,
                        chartDecisionSelectList: [...this.state.chartDecisionSelectList, this.createSelectMenu(
                            this.handleChartDecisionChange,
                            selectedItem.children,
                            selectedItem.id,
                            "id", "name",
                            false, "chartDecision.form.placeholder.chartDecisionItem"
                        )],
                    },
                );
            }
            else {
                this.setState(
                    {
                        selectedChartDecision: selectedItem,
                        treeData: this.parseWrittenTablesData(),
                    },
                );
            }
        });
    }

    /**
     * chart decision tree select box check method
     * checks if parent nodes are changed by the user
     * and modifies child nodes
     * @param selectedItem current node on chart decision tree 
     */
    private checkSelectBoxConditions = (selectedItem: IChartDecisionTreeModel) => {
        const { chartDecisionSelectList, selectedChartDecision } = this.state;

        if (selectedChartDecision !== undefined) {
            const depth = selectedItem.id.split("-").length;
            let isLeaf = selectedItem.children === undefined || selectedItem.children === null;
            let hasLeafChanged = isLeaf && this.state.selectedChartDecision !== selectedItem;

            if (depth < chartDecisionSelectList.length) {
                // it means that parent select box item has changed
                const itemCountToBeDeleted = chartDecisionSelectList.length - depth;
                let newSelectBoxList = Object.assign([], chartDecisionSelectList.splice(depth, itemCountToBeDeleted));
                this.setState(
                    {
                        selectedColumnsInputList: [],
                        chartDecisionSelectList: newSelectBoxList
                    }
                );
            }

            else if (hasLeafChanged) {
                this.setState(
                    {
                        selectedColumnsInputList: [],
                        hasLeafChanged: true,
                        treeData: this.parseWrittenTablesData(),
                    }
                );
            }
        }
    }

    /**
     * handles call back function between input fields
     * @param modelList selected unique path list (appId-tablePath-column)
     * @param index defines the first one's index of two elements to change.  
     */
    private handleInputFieldSwap = (modelList: ISelectedIDBMSModel[], index: number) => {
        const tmp = modelList[index];
        modelList[index] = modelList[index + 1];
        modelList[index + 1] = tmp;
        this.setState(
            {
                selectedDBMSModelList: modelList
            }
        );
        this.getSelectedColumnsInputList(modelList);
    }

    /**
     * service call and parse method
     * sets the columns of the specified table as tree node
     * @param currentItem is the table tree node
     */
    private getColumnsByTablePath = (currentItem: ITreeDataModel) => {
        let tablePathQueryStr = encodeURIComponent(currentItem.key.split("-")[1]);
        getTableColumns(tablePathQueryStr.replace(/%/g, '%25')).then((response: any) => {
            let clonedTreeData = cloneObj(this.state.treeData);
            const newTreeData = cloneObj(currentItem);
            newTreeData.children = this.parseColumnData(response, currentItem);

            this.setState({
                treeData: this.setItem(clonedTreeData, cloneObj(currentItem), cloneObj(newTreeData), (touchedNode: any, myNode: any) => {
                    return currentItem.key === touchedNode.key
                })
            }, () => {
                console.log("state tree data", this.state.treeData);
            });
        });
    }

    private drawChart = (response: any) => {
        const chartType = this.state.selectedChartDecision.key;
        const rowData: IRowData[] = response;
        let data: any[] = [];

        switch (chartType) {

            case ChartType.BAR_CHART:
                break;

            case ChartType.BUBBLE_CHART:
                break;

            case ChartType.CIRCULAR_AREA_CHART:
                break;

            case ChartType.COLUMN_CHART:
                rowData.forEach(
                    (row: any) => {
                        let dataEntry = {};
                        row.forEach(column => {
                            dataEntry[column.columnName] = column.value;
                        });
                        data.push(dataEntry);
                    }
                );
                const config = {
                    chartType: ChartGroupType.XY,
                    chartSeries: [
                        {
                            categoryX: this.state.selectedDBMSModelList[0].column.name,
                            value: this.state.selectedDBMSModelList[1].column.name,
                            title: this.state.selectedDBMSModelList[0].tablePath,
                            type: XYChartType.COLUMNSERIES,
                            valueAxis:
                            {
                                text: this.state.selectedDBMSModelList[1].column.name,
                            },
                            style: {
                                fill: "#ADD8E6",
                                fontWeight: "600",
                                strokeWidth: 3,
                            },
                        },
                    ],
                    categories: [
                        {
                            field: this.state.selectedDBMSModelList[0].column.name,
                            text: this.state.selectedDBMSModelList[0].column.name,
                        }
                    ],
                    tooltipText: this.state.selectedDBMSModelList[1].column.name + " data comparison",
                    data: data,
                    legend: {
                        position: LegendPosition.BOTTOM,
                    },
                    is3D: true,
                };
                this.pushChartComponent(config);
                break;

            case ChartType.COLUMN_HISTOGRAM:
                break;

            case ChartType.D3_AREA_CHART:
                break;

            case ChartType.LINE_CHART:
                const xyChartConfig = {
                    chartType: ChartGroupType.XY,
                    chartSeries: [
                        {
                            categoryX: "developer",
                            value: "issues",
                            title: "Issues Done",
                            type: XYChartType.COLUMNSERIES,
                            valueAxis:
                            {
                                text: "Issues done",
                            },
                            style: {
                                fill: "#ADD8E6",
                                fontWeight: "600",
                                strokeWidth: 3,
                            },
                        },
                    ],
                    categories: [
                        {
                            field: "developer",
                            text: "Developers",
                        }
                    ],
                    tooltipText: "Developer/Issues Done Report",
                    data: data,
                    legend: {
                        position: LegendPosition.BOTTOM,
                    },
                    is3D: true,
                };
                break;

            case ChartType.LINE_HISTOGRAM:
                break;

            case ChartType.PIE_CHART:
                break;

            case ChartType.SCATTER_CHART:
                break;

            case ChartType.STACKED_AREA_CHART:
                break;

            case ChartType.STACKED_COLUMN_CHART:
                break;

            case ChartType.TABLE_CHART:
                break;

            case ChartType.VAR_WIDTH_COLUMN_CHART:
                break;
        }

    }

    private pushChartComponent = (chartConfig: any) => {
        const { chartType } = chartConfig;
        switch (chartType) {
            case ChartGroupType.XY:
                const xyComponent: JSX.Element =
                    <XYChartSeriesComponent
                        id={"xy"}
                        chartStyle={this.chartStyle}
                        chartConfig={chartConfig}
                    />;

                this.setState(
                    {
                        components: [...this.state.components, xyComponent],
                    },
                );
                break;

            case ChartGroupType.PIE:
                const pieComponent: JSX.Element =
                    <PieChartSeriesComponent
                        id={"pie"}
                        chartStyle={this.chartStyle}
                        chartConfig={chartConfig}
                    />;

                this.setState(
                    {
                        components: [...this.state.components, pieComponent],
                    },
                );
                break;

            case ChartGroupType.MAP:
                const mapComponent: JSX.Element =
                    <MapChartSeriesComponent
                        id={"map"}
                        chartStyle={this.chartStyle}
                        chartConfig={chartConfig}
                    />;

                this.setState(
                    {
                        components: [...this.state.components, mapComponent],
                    },
                );
                break;
        }
    }

    /**
     * Util Methods : Create Method
     * Creates material dialogs select-option menu.
     * And returns it to accessor
     * @param event: callback function on item selected
     * @param optionArray: options for the select menu
     * @param id: id of the select html element
     * @param optionKey: item's attribute to be used for the option element
     * @param valueKey: item's attribute to be used for the option element's value
     * @param multiple: multiple selection is enabled
     * @param placeholderKey: placeholder for the select menu
     */
    private createSelectMenu = (
        event: any,
        optionArray: any,
        id: string,
        optionKey: string,
        valueKey: string,
        multiple: boolean,
        placeholderKey: any,
    ) => {
        const select = <SelectComponent
            key={id}
            formName="chartDecisionSelectComponent"
            id={id}
            fullWidth={true}
            onSelect={event}
            options={optionArray}
            primitiveType={true}
            optionKey={optionKey}
            value={valueKey}
            multipleSelection={multiple}
            placeHolder={placeholderKey}
        />;
        return select;
    }

    private createSelectedColumnArray = () => {
        let columnOptionArray: any[] = [];
        const { selectedDBMSModelList } = this.state;
        selectedDBMSModelList.forEach(
            element => {
                const columnOption = {
                    id: "selected-fields-menu-" + selectedDBMSModelList.indexOf(element),
                    name: element.column.name
                };
                columnOptionArray.push(columnOption);
            }
        );
        return columnOptionArray;
    }

    /**
     * RC Tree component create method
     * containing dbms architecture 
     */
    private createRCTree = () => {
        const component = <RCTreeComponent
            key="form-dbms-tree"
            onSelected={this.onSelected}
            treeData={this.state.treeData}
            onDataLoad={this.onRCTreeDataLoad}
        />;
        return component;
    }

    /**
     * written tables data parse method
     * creates first 2 refraction of the app structure
     */
    private parseWrittenTablesData = () => {
        var treeDataList: ITreeDataModel[] = [];
        const { appModel } = this.props;
        var treeData: ITreeDataModel = {
            key: this.props.appModel.appId,
            title: this.props.appModel.appId,
            type: NodeType.DB,
            children: [],
        };

        if (appModel) {
            appModel.tablePathList.forEach(tablePathModel => {
                var child: ITreeDataModel = {
                    key: "",
                    title: "",
                    children: [],
                };
                child.key = appModel.appId.toString() + "-" + tablePathModel.tablePath;
                child.title = tablePathModel.tablePath;
                child.type = NodeType.TABLE;
                treeData.children.push(child);
            });
        }
        treeDataList.push(treeData);
        return treeDataList;
    }

    /**
     * column data of specified written table, and parse method
     * creates 3rd refraction (level 3) of the app structure
     * @param response service response to be parsed
     * @param currentItem response array will be put inside currentItem
     */
    private parseColumnData = (response: any, currentItem: ITreeDataModel) => {
        var treeDataList: ITreeDataModel[] = [];
        response.forEach(element => {
            var treeData: ITreeDataModel = {
                key: "",
                title: "",
                children: [],
            };
            treeData.key = currentItem.key + "-" + element["columnName"];
            treeData.title = element["columnName"];
            treeData.type = NodeType.COLUMN;
            treeDataList.push(treeData);
        });
        return treeDataList;
    }

    /**
     * Util Methods: Create method
     *  Creates material dialogs list.
     *  returns it to its accessor
     * @param modelList selected model list on rc tree component
     */
    private getSelectedColumnsInputList = (modelList: ISelectedIDBMSModel[]) => {
        const { classes } = this.props;
        const tmpInputBoxList: JSX.Element[] = [];
        if (modelList.length === 1 &&
            this.state.selectedChartDecision.key !== ChartType.PIE_CHART) {
            return;
        }

        for (var i = 0; i < modelList.length; i++) {
            let element = modelList[i];

            let index = modelList.indexOf(element);
            let nextElementIsNeeded = index % 2 === 0;
            if (!nextElementIsNeeded) {
                continue;
            }
            let nextElement = modelList[index + 1];
            const inputBox = <div key={index}>
                <FormControl fullWidth className={classes.input}>
                    <InputLabel >
                        {
                            <FormattedMessage
                                id="chartDecision.form.xAxis"
                            />
                        }
                    </InputLabel>
                    <Input
                        key={`${index}-x-axis`}
                        id={`${index}-x-axis`}
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        disabled={true}
                        value={element.column.name}
                    />
                </FormControl>

                <Button variant="outlined"
                    label={"chartDecision.form.inputFieldSwap"}
                    type={ButtonType.action}
                    aria-label="Add"
                    className={classes.button}
                    onClick={this.handleInputFieldSwap.bind(this, modelList, i)}
                >
                    <SwapVert />
                </Button>

                <FormControl fullWidth className={classes.input}>
                    <InputLabel >
                        {
                            <FormattedMessage
                                id="chartDecision.form.yAxis"
                            />
                        }
                    </InputLabel>
                    <Input
                        key={`${index}-y-axis`}
                        id={`${index}-y-axis`}
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        disabled={true}
                        value={nextElement.column.name}
                    />
                </FormControl>
            </div>;

            tmpInputBoxList.push(inputBox);
        }

        this.setState(
            {
                selectedColumnsInputList: tmpInputBoxList
            }
        );
    }

    /**
     * util method for getting the item of the tree
     * @param data is the root tree data
     * @param node parent node is get with children node 
     * @param predicate tree data is get with predicate rule
     * @param options is extra
     */
    getItem = (data, node, predicate, options = {}) => {
        let config = Object.assign({}, this.defaults, options);

        let result = data.find(c => predicate(c, node));
        if (result) {
            return result;
        }
        for (let i = 0; i < data.length; i++) {
            let item = data[i];

            if (item[config.props.children] && item[config.props.children].length > 0) {
                result = this.getItem(item[config.props.children], node, predicate, config);
                if (result) {
                    return result;
                }
            }
        }
        return result;
    }

    /**
     * util method for setting the item of the tree
     * @param _data is the root tree data
     * @param node is to be changed
     * @param newNode is to be set under node
     * @param predicate change parent node with predicate rule
     * @param options is extra
     */
    setItem = (_data, node, newNode, predicate, options = {}) => {
        let data = cloneObj(_data);
        let config = Object.assign({}, this.defaults, options);

        let result = data.find(c => predicate(c, node));
        if (result) {
            result = newNode;
        }
        for (let i = 0; i < data.length; i++) {
            let item = data[i];

            if (item[config.props.children] && item[config.props.children].length > 0) {
                result = this.getItem(item[config.props.children], node, predicate, config);
                if (result) {
                    const index = item[config.props.children].findIndex(r => r === result)
                    item[config.props.children][index] = newNode;
                    break;
                }
            }
        }
        return cloneObj(data);
    }
}

export default withStyles(style, { withTheme: true })(injectIntl(ChartDecisionFormComponent));
