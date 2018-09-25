import {Chip, Grid, Theme, WithStyles, withStyles} from "@material-ui/core";
import React from "react";
import Draggable, { IDraggableComponentProps } from "../draggable";

const style: any = (theme: Theme) => ({
   chip: {
       margin: theme.spacing.unit,
   },
});

export interface IDraggableChip extends IDraggableComponentProps {
    data: any;
    label: string;
}

export interface IDraggableChipsProps {
    chips: IDraggableChip[];
}

type AllProps = IDraggableChipsProps & WithStyles<"chip">;

const DraggableChipsComponent: React.SFC<AllProps> = ({chips, classes, ...props}: AllProps) => (
    <Grid
        container={true}
    >
        {chips.map((chip, index) => (
            <Grid
                item={true}
                key={`grid-${index}`}
            >
                <Draggable
                    type={chip.type}
                    component={chip.component}
                    key={`draggable-${index}`}
                >
                    <Chip
                        className={classes.chip}
                        key={`draggable-chip-${index}`}
                        label={chip.label}
                    />
                </Draggable>
            </Grid>
        ))}
    </Grid>
);

export default withStyles(style, {withTheme: true})(DraggableChipsComponent);
