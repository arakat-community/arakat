import { ClickAwayListener, Drawer, Theme, withStyles, WithStyles } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import { Anchor } from "../../common/models/sidebar/anchor";

const style: any = (theme: Theme) => ({
    black: {
        backgroundColor: "#3c3232",
        color: "white",
    },
    root: {
        width: theme.spacing.unit * 30,
        height: "100vh",
        outline: "none",
    },
});

/**
 * drawer's state
 */
export enum DrawerState {
    closed,
    opened,
}

export interface IDrawerProps {
    anchor: Anchor;
    blackTheme?: boolean;
    children: any;
    id: string;
    onClose: () => void;
    state: DrawerState;
}

type AllTypes = IDrawerProps & WithStyles<"black" | "root">;

const DrawerComponent: React.SFC<AllTypes> = ({classes, ...props}: AllTypes) => (
        <Drawer
            key={props.id}
            anchor={props.anchor}
            open={props.state === DrawerState.opened}
            onClose={props.onClose}
            PaperProps={
                {
                    className: classnames({
                        [classes.black]: props.blackTheme,
                        [classes.root]: true,
                    }),
                    // onMouseLeave: props.onClose,
                }
            }
        >
            {props.children}
        </Drawer>
);

export default withStyles(style, {withTheme: true})(DrawerComponent);
