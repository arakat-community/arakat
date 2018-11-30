import { Drawer, Theme, withStyles, WithStyles } from "@material-ui/core";
import classnames from "classnames";
import React, { Component } from "react";
import { IDrawerState } from "../../store/drawer/types";

const drawerBackgroundColor = '#545C61'
const style: any = (theme: Theme) => ({
    root: {
        backgroundColor: drawerBackgroundColor,
        width: theme.spacing.unit * 40,
        height: "100vh",
        outline: "none",
        overflowY: "auto",
    },
    dockWhenDrawerIsOpened: {
        backgroundColor: drawerBackgroundColor,        
    },
    dockWhenDrawerIsClosed: {
        backgroundColor: drawerBackgroundColor,        
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

type AllTypes = IDrawerProps & WithStyles<"root" | "dockWhenDrawerIsOpened" | "dockWhenDrawerIsClosed" | "button">;

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
                        id='drawer'
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
                                className: classes.root
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
