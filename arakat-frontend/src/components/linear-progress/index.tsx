import { LinearProgress, Theme, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";

const style: any = (theme: Theme) => ({
    hide: {
        display: "none",
    },
    root: {
        position: "fixed",
        right: 0,
        top: theme.spacing.unit * 7,
        [theme.breakpoints.up("sm")]: {
            top: theme.spacing.unit * 8,
        },
        width: "100%",
        zIndex: 2,
    },
});

export interface ILinearProgressProps {
    loading: boolean;
}

type AllProps = ILinearProgressProps & WithStyles<"root" | "hide">;

const LinearProgressComponent: React.SFC<ILinearProgressProps> = ({classes, ...props}: AllProps) => (
    <LinearProgress className={classNames(classes.root, !props.loading && classes.hide)}/>
);

export default withStyles(style, {withTheme: true})(LinearProgressComponent);
