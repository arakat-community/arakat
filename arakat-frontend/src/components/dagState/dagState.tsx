import React, { Component } from "react";
import {
    Theme, WithStyles, withStyles,
} from "@material-ui/core";
import { DagState } from "../../models/enums/dagState";

export interface IProps {
    gList: any[];
}

const styles: any = (theme: Theme) => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
});

type PropWithStyles = IProps & WithStyles<"margin" | "padding">;

/**
 * export xy chart
 */
class SvgComponent extends Component<PropWithStyles> {

    constructor(props: PropWithStyles) {
        super(props);
    }

    /**
     * div element html
     */
    public render(): JSX.Element {
        return (
            <svg height="37" width="240px" id="task-run-testbash">
                {this.props.gList.map(g => {
                    const factor = this.props.gList.indexOf(g) + 1;
                    const xFactor = (factor * 35).toString();
                    return (
                        <g
                            transform={`translate(${xFactor},18.5)`}>
                            <text
                                fill="black"
                                textAnchor="middle"
                                fontSize="8"
                                y="3">
                                {
                                    g["count"]
                                }
                            </text>
                            <circle strokeWidth="2" fillOpacity="0" r="12.5"
                                stroke={g["count"] > 0 ? (g["state"] === DagState.success ?
                                    "green" : (g["state"] === DagState.failed ? "red" : "yellow")) : "black"}
                                style={{ cursor: "pointer", opacity: 1, strokeWidth: 2 }}></circle>
                        </g>
                    );
                }
                )}
            </svg>
        );
    }


}
export default withStyles(styles, { withTheme: true })(SvgComponent);