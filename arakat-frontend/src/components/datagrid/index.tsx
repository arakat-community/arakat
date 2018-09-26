import {
    Column,
    EditingState,
    FilteringState,
    GroupingState,
    IntegratedFiltering,
    IntegratedGrouping,
    IntegratedPaging,
    IntegratedSelection,
    IntegratedSorting,
    PagingState,
    SelectionState,
    SortingState,
  } from "@devexpress/dx-react-grid";
import {
    ColumnChooser,
    DragDropProvider,
    Grid,
    GroupingPanel,
    PagingPanel,
    Table,
    TableColumnReordering,
    TableColumnVisibility,
    TableEditColumn,
    TableFilterRow,
    TableGroupRow,
    TableHeaderRow,
    TableSelection,
    Toolbar,
  } from "@devexpress/dx-react-grid-material-ui";
import { Button, IconButton, Theme, WithStyles, withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { Component, ReactText } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { IGridColumn } from "../../common/models/grid-column";
import { GridColumnType } from "../../common/models/grid-column/type";
import { BooleanTypeProvider } from "./boolean-type-provider";
import { IDataCellProps } from "./cell-props";
import CheckboxCell from "./checkbox-cell";
import { getLocalMessages, IDataGridLocalMessages } from "./localizations";

export interface IDataGridProps {
    data: object[];
    columns: IGridColumn[];
    enableColumnChooser?: boolean;
    enableDeleteAction?: boolean;
    enableEditAction?: boolean;
    enableGrouping?: boolean;
    enableSelection?: boolean;
    enableSelectionAll?: boolean;
    enableSorting?: boolean;
    onEditAction: (row: object) => void;
    onDeleteAction: (row: object) => void;
}

interface IDataGridState {
    data: object[];
    columns: IGridColumn[];
    enableColumnChooser?: boolean;
    enableGrouping?: boolean;
    enableSelection?: boolean;
    enableSelectionAll?: boolean;
    enableSorting?: boolean;
    selection: ReactText[];
}

/**
 * the global style fixes filter's action buttons position
 * @param theme theme of mui
 */
const style: any = (theme: Theme) => ({
    "@global": {
        "div[class^=\"TableFilterCell-flexContainer\"]": {
            flexDirection: "row-reverse",
        },
        "[class^=\"TableFilterCell-flexContainer\"] > button": {
            right: theme.spacing.unit * 4,
            zIndex: 10,
        },
        "span[class^=\"Pagination-rowsLabel\"]": {
            fontSize: "1.2rem",
        },
    },
    "root": {
        width: "100%",
    },
});

type AllProps = IDataGridProps & WithStyles<"root"> & InjectedIntlProps;

/**
 * data grid component
 */
class DataGridComponent extends Component<AllProps, IDataGridState> {
    public tableMessages: object = {
    };
    public filterMessages: object = {
    };

    constructor(props: AllProps) {
        super(props);

        const {intl} = props;

        const localMessages: IDataGridLocalMessages = getLocalMessages(intl);

        this.tableMessages = localMessages.tableMessages;
        this.filterMessages = localMessages.filterMessages;
    }

    public changeSelection = (selection) => this.setState({ selection });

    public renderFilterCell = (cellComponentObject) => {
        return <TableFilterRow.Cell {...cellComponentObject} />;
    }

    public renderEditColumnComponent = (cellComponentObject) => {
        const {enableDeleteAction, enableEditAction} = this.props;
        const currentRow: any = { ...cellComponentObject.row };
        return (
            <TableEditColumn.Cell {...cellComponentObject}>
                {enableEditAction && (
                    <IconButton
                        aria-label="Edit"
                    >
                        <EditIcon
                            onClick={this.handleEditAction.bind(this, currentRow)}
                        />
                    </IconButton>
                )}
                {enableDeleteAction && (
                    <IconButton
                        aria-label="Delete"
                    >
                        <DeleteIcon
                            onClick={this.handleDeleteAction.bind(this, currentRow)}
                        />
                    </IconButton>
                )}
            </TableEditColumn.Cell>
        );
      }

    public renderCellComponent = (cellComponentObject: IDataCellProps) => {
        const  column: IGridColumn = cellComponentObject.column;
        if (column.type === GridColumnType.Boolean) {
            return <CheckboxCell {...cellComponentObject}/>;
        }
        return <Table.Cell {...cellComponentObject} />;
      }

    /**
     * outputs render
     */
    public render(): JSX.Element {
        const {data, columns, enableGrouping, enableSelection, enableSelectionAll,
               enableSorting, enableColumnChooser, classes} = this.props;

        return (
            <div
                className={classes.root}
            >
                <Grid
                    rows={data}
                    columns={columns}
                >
                    <EditingState
                        onCommitChanges={this.handleCommitChanges}
                    />
                    <FilteringState />
                    <SortingState />
                    <SelectionState />
                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={20}
                    />
                    <IntegratedFiltering />
                    <IntegratedSorting />
                    <IntegratedPaging />
                    <IntegratedSelection />
                    <BooleanTypeProvider
                        columns={columns.filter((f) => f.type === GridColumnType.Boolean)}
                        booleanTypeDescriptions={
                                                columns.find((f) => f.type === GridColumnType.Boolean) &&
                                                columns.find((f) => f.type === GridColumnType.Boolean).booleanTypeDescription
                                            }
                    />
                    <DragDropProvider />
                    <Table
                        messages={this.tableMessages}
                        // cellComponent={this.renderCellComponent}
                    />
                    <TableSelection
                        showSelectionColumn={false}
                        showSelectAll={enableSelection && enableSelectionAll}
                    />
                    <TableColumnReordering />
                    <TableHeaderRow
                        showSortingControls={enableSorting}
                    />
                    <TableFilterRow
                        cellComponent={this.renderFilterCell}
                        showFilterSelector={true}
                        messages={this.filterMessages}
                    />
                    <PagingPanel/>
                    <TableEditColumn
                        cellComponent={this.renderEditColumnComponent}
                    />
                </Grid>
            </div>
        );
    }

    private handleDeleteAction = (currentRow: any, event: any) => {
        const {onDeleteAction} = this.props;
        onDeleteAction(currentRow);
    }

    private handleEditAction = (currentRow: any, event: any) => {
        const {onEditAction} = this.props;
        onEditAction(currentRow);
    }

    /**
     * hack for devexpress custom edit column
     */
    private handleCommitChanges = () => {
        const {onDeleteAction} = this.props;
    }
}

export default withStyles(style, {withTheme: true})(injectIntl(DataGridComponent));
