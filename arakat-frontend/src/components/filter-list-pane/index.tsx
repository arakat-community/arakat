import { Chip, Grid, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { ConnectDropTarget, DndComponentClass, DragSourceMonitor, DropTarget } from "react-dnd";
import { FormattedMessage } from "react-intl";
import { IDataSourceItem } from "../../common/models/datasource";
import { cloneObj } from "../../common/utils/generic";
import {guid} from "../../common/utils/guid";

export interface IFilterPaneProps {
    draggableSources: string[];
    canDrop?: boolean;
    isOver?: boolean;
    connectDropTarget?: ConnectDropTarget;
    filters: IDataSourceItem[];
    onFilterDropped: (filter: IDataSourceItem) => void;
}

type AllType = IFilterPaneProps;

const FilterListPane: React.SFC<AllType> = ({filters, ...props}: AllType) => (
    <Paper
        square={true}
    >
        <Grid
            container={true}
        >
            <Grid
                item={true}
                xs={12}
            >
                <Typography
                    variant="title"
                >
                    <FormattedMessage
                        id="worksheet.filters.title"
                    />
                </Typography>
            </Grid>
            {
                filters.map((filter) => (
                    <Chip
                        key={`filter-chip-${filter.field}`}
                        label={filter.field}
                    />
                ))
            }
        </Grid>
    </Paper>
);

const filterPaneSpec: object = {
    drop: (props: IFilterPaneProps, monitor: DragSourceMonitor, component: Component | null) => {
          const droppedItem: any = cloneObj(Object.assign({}, monitor.getItem(), {id: guid().uid()}));
          props.onFilterDropped(droppedItem);
          return { name: "An item dropped on worksheet" };
    },
  };

const FilterListPaneComponent: DndComponentClass<IFilterPaneProps> =
DropTarget(
    (props: IFilterPaneProps) => props.draggableSources,
    filterPaneSpec,
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({shallow: true}),
        canDrop: monitor.canDrop(),
    }),
)(FilterListPane);

export default FilterListPaneComponent;
