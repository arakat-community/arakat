import { Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";

export interface ISelectProps {
    className?: string;
    disabled?: boolean;
    label: JSX.Element;
    onClick?: (event: any) => void;
    optionList: JSX.Element[];
}

const style: any = (theme: Theme) => ({
    select: {
        color: "#000",
        height: 40,
        width: 300,
        marginLeft: 12,
        marginTop: 12,
        fontWeight: 700,
    },
});

type PropWithStyles = ISelectProps & WithStyles<"select">;

const Select: React.SFC<ISelectProps> = ({
    classes,
    ...props,
}: PropWithStyles) => (
        <div>
            <div>
                {props.label}
                <select onClick={props.onClick}
                    className={classes.select}>
                    {props.optionList}
                </select>
            </div>
        </div>
    );

export default withStyles(style, { withTheme: true })(Select);
