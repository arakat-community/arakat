import { List, ListItem, ListItemIcon, ListItemText, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import classnames from "classnames";
import React, { Component, PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { IRouteGroup } from "../../common/models/route/group";
import { IRouteItem } from "../../common/models/route/item";

const styles: any = (theme: Theme) => ({
    root: {
        display: "flex",
        zIndex: 10,
    },
    item: {
        whiteSpace: "nowrap",
        padding: 0,
    },
    submenu: {
        // zIndex: 10,
    },
    hide: {
        display: "none",
    },
});

export interface IHorizontalMenuProps {
    routes: IRouteGroup[];
}

interface IHorizontalMenuState {
    openedMenu?: string;
}

type AllProps = IHorizontalMenuProps & WithStyles<"root" | "item" | "submenu" | "hide">;

let refs: any[];

/**
 * horizontal menu component
 */
class HorizontalMenuComponent extends PureComponent<AllProps, IHorizontalMenuState> {
    public state = {
        openedMenu: null,
    };

    [x: string]: any;

    constructor(props: AllProps) {
        super(props);
        this.setButtonRef = this.renderButtonRef.bind(this);
        refs = [];
    }

    /**
     * renders output
     */
    public render(): JSX.Element {
        const {classes, routes} = this.props;

        return (
            <>
                <List
                    component="nav"
                    className={classes.root}
                >
                    {this.renderMainMenu(routes, classes)}
                </List>
                {this.renderSubMenu(routes, classes)}
            </>
        );
    }

    private renderMainMenu: any = (routeGroups: IRouteGroup[], classes) => (
        routeGroups.map((routeGroup, index) =>
           (
                <ListItem
                    key={index}
                    button={true}
                    buttonRef={this.setButtonRef.bind(this, index)}
                    onMouseEnter={this.handleMouseEnter.bind(this, index)}
                >
                    <ListItemIcon>
                        <routeGroup.icon />
                    </ListItemIcon>
                    <ListItemText
                        disableTypography={true}
                        primary={
                            <Typography
                                variant="body1"
                                gutterBottom={true}
                            >
                                {routeGroup.name}
                            </Typography>
                        }
                        className={classes.item}
                    />
                </ListItem>
            ),
        )
    )

    private renderSubMenu: any = (routesGroups: IRouteGroup[], classes) => (
        routesGroups.map((routeGroup, routeGroupIndex) =>
            (
                    <Popper
                        open={this.state.openedMenu === `${routeGroupIndex.toString()}`}
                        anchorEl={refs[routeGroupIndex]}
                        transition={true}
                        disablePortal={true}
                        placement="bottom-start"
                        className={classnames({
                            [classes.submenu]: true,
                            [classes.hide]: this.state.openedMenu !== `${routeGroupIndex.toString()}`,
                        })}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                timeout={{
                                    enter: 600,
                                }}
                                {...TransitionProps}
                                style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
                            >
                                <Paper>
                                    {
                                        routeGroup.routes.map((route: IRouteItem, routeIndex) => (
                                            <ClickAwayListener
                                                onClickAway={this.handleMenuClose}
                                            >
                                                <List
                                                    component="nav"
                                                    style={{
                                                        marginTop: 9,
                                                    }}
                                                >
                                                <NavLink
                                                    to={route.path}
                                                    key={routeIndex}
                                                    id={`navlink_${route.path}`}
                                                >
                                                    <ListItem
                                                        button={true}
                                                    >
                                                        <ListItemIcon>
                                                            <route.icon />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            disableTypography={true}
                                                            primary={
                                                                        <Typography
                                                                            variant="body1"
                                                                            gutterBottom={true}
                                                                        >
                                                                            {route.name}
                                                                        </Typography>
                                                                    }
                                                            className={classes.item}
                                                        />
                                                    </ListItem>
                                                </NavLink>
                                                </List>
                                            </ClickAwayListener>
                                        ))
                                    }
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
            ),
        )
    )

    private renderButtonRef = (routeGroupIndex: number, menuRef: any) => {
        // this.anchorEl = menuRef;
        refs[routeGroupIndex] = menuRef;
    }

    private handleMouseEnter = (routeGroupIndex: number, event: any) => {
        this.setState({
            openedMenu: routeGroupIndex.toString(),
        });
    }

    private handleMenuClose = () => {
        this.setState({
            openedMenu: null,
        });
    }
}

export default withStyles(styles, {withTheme: true})(HorizontalMenuComponent);
