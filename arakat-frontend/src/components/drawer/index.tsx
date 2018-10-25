import { ClickAwayListener, Drawer, Theme, withStyles, WithStyles } from "@material-ui/core";
import classnames from "classnames";
import { relative } from "path";
import React, { Component } from "react";
import { IDrawerState } from "../../store/drawer/types";

const style: any = (theme: Theme) => ({
    black: {
        backgroundColor: theme.palette.background.default,
        width: theme.spacing.unit * 35,
        height: "100vh",
        color: "white",
        overflowY: "auto",
    },
    root: {
        backgroundColor: theme.palette.background.default,
        width: theme.spacing.unit * 35,
        height: "100vh",
        outline: "none",
        overflowY: "auto",
    },
    dockWhenDrawerIsOpened: {
        backgroundColor: theme.palette.background.default,
    },
    dockWhenDrawerIsClosed: {
        backgroundColor: theme.palette.background.default,
        position: "absolute",
        zIndex: -1,
    },
});

export interface IDrawerProps {
    blackTheme?: boolean;
    children: any;
    id: string;
    onClose: () => void;
    drawerState: IDrawerState; // from props
}

type AllTypes = IDrawerProps & WithStyles<"black" | "root" | "dockWhenDrawerIsOpened" | "dockWhenDrawerIsClosed" | "button">;

/**
 * DrawerComponent
 */
class DrawerComponent extends Component<AllTypes> {

    constructor(props: AllTypes) {
        super(props);
    }
    /**
     * render output of cyto
     */
    public render(): JSX.Element {
        const { classes } = this.props;
        return (
                <div>
                    <Drawer
                        key={this.props.id}
                        className={classnames({
                                [classes.dockWhenDrawerIsClosed]: !this.props.drawerState.isOpen,
                                [classes.dockWhenDrawerIsOpened]: this.props.drawerState.isOpen,
                            })
                        }
                        open={this.props.drawerState.isOpen === true}
                        onClose={this.props.onClose}
                        variant="persistent"
                        PaperProps={
                            {
                                className: classnames({
                                    [classes.black]: this.props.blackTheme,
                                    [classes.root]: !this.props.blackTheme,
                                }),
                            }
                        }

                    >
                        {this.props.children}
                    </Drawer>
                </div>
        );

    }

}

export default withStyles(style, {withTheme: true})(DrawerComponent);
