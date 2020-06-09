import { Theme, WithStyles, withStyles } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import React from "react";

export interface ILabelProps {
    className?: string;
    disabled?: boolean;
    text: string;
}

const style: any = (theme: Theme) => ({
    label: {
        color: "#546548",
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: 600,
    },
});

type PropWithStyles = ILabelProps & WithStyles<"label">;

const Label: React.SFC<ILabelProps> = ({
    classes,
    ...props,
}: PropWithStyles) => (
        <label className={classes.label}>{props.text}</label>
    );

export default withStyles(style, { withTheme: true })(Label);
