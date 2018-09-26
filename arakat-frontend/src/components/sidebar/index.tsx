import Img from "@fdmg/ts-react-image";
import { Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Theme,
    Typography, withStyles, WithStyles } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReorderIcon from "@material-ui/icons/Reorder";
import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
import { ICollapsibleRoute } from "../../common/models/route/collapsible";
import { IRouteGroup } from "../../common/models/route/group";
import { IRouteItem } from "../../common/models/route/item";
import { ISidebarActiveItem } from "../../common/models/sidebar/active-item";
import { Anchor } from "../../common/models/sidebar/anchor";
import { SidebarState } from "../../common/models/sidebar/state";
import { Variant } from "../../common/models/sidebar/variant";
import Scrollbar from "../scrollbar";
import {styles} from "./styles";

export interface ISidebarProps {
    activeMenuItem: ISidebarActiveItem;
    appBrand: string;
    appName: string;
    anchor: Anchor;
    state: SidebarState;
    logoUrl: string;
    onMenuClicked?: (activeItem: ISidebarActiveItem) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onSidebarPinned?: () => void;
    routes: IRouteGroup[];
    variant: Variant;
}

type PropWithStyle = ISidebarProps & WithStyles<"drawerPaper"|"logo" | "drawerPaperClose" | "toolbar" | "hide" | "appName"
| "collapseIcon" | "brand" | "brandOpened" | "brandClosed" | "navlink" | "menuGroup" | "menuTitle" | "menuDivider" | "menuIcon"
| "menuText" | "listItem" | "activeMenu" | "appBrand" | "appNameArea">;

const Sidebar: React.SFC<ISidebarProps> = ({
    classes,
    ...props,
}: PropWithStyle) => (
    <Drawer
        variant={props.variant}
        open={props.state === SidebarState.opened}
        anchor={props.anchor}
        classes={{
            paper: classNames({
                [classes.drawerPaper]: true,
                [classes.drawerPaperClose]: props.state === SidebarState.closed,
            }),
        }}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
    >
        <div
            className={classNames({
                [classes.toolbar] : true,
            })}
        >
            <div
                className={classNames({
                    [classes.brand]: true,
                    [classes.brandOpened]: props.state === SidebarState.opened,
                })}
            >
                <Img
                    src={props.logoUrl}
                    alt="logo"
                    className={classNames({
                        [classes.brandClosed]: props.state === SidebarState.closed,
                        [classes.logo]: true,
                    })}
                />
                <Typography
                    variant="subheading"
                    className={classNames({
                        [classes.appNameArea] : true,
                        [classes.hide] : props.state === SidebarState.closed,
                    })}
                >
                    <Typography
                        variant="subheading"
                        className={classes.appBrand}
                        component="span"
                    >
                        {props.appBrand.toUpperCase()}
                    </Typography>
                    <Typography
                        variant="subheading"
                        component="span"
                        className={classes.appName}
                    >
                        {props.appName.toUpperCase()}
                    </Typography>
                </Typography>
            </div>
                <IconButton
                    onClick={props.onSidebarPinned}
                    className={classNames({
                        [classes.collapseIcon]: true,
                        [classes.hide] : props.state === SidebarState.closed,
                    })}
                >
                    <ReorderIcon />
                </IconButton>
        </div>
        <Scrollbar
            key="sidebar-scrollbar"
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
        >
                <List>
                    {
                    props.routes.map((group) => {
                        return (<>
                        <div
                            className={classes.menuGroup}
                        >
                            {
                                props.state === SidebarState.opened ?
                                        <Typography
                                            className={classes.menuTitle}
                                            variant="caption"
                                            gutterBottom={true}
                                        >
                                            {group.name}
                                        </Typography>
                                    :
                                        <Divider
                                            className={classes.menuDivider}
                                        />
                            }
                        </div>
                        {
                            group.routes.map((route, key) => {
                                const collapsibleItem: ICollapsibleRoute = route as ICollapsibleRoute;
                                if (collapsibleItem.collapsible) {
                                    return (
                                        <>
                                        <ListItem
                                            key={`${collapsibleItem.name}_${key}`}
                                            button={true}
                                            onClick={props.onMenuClicked.bind(this, {collapsibleId:
                                                                                    props.activeMenuItem.collapsibleId ===
                                                                                    collapsibleItem.id ? null : collapsibleItem.id,
                                                                                     menuId: props.activeMenuItem.menuId,
                                                                                     title: props.activeMenuItem.title,
                                                                                    },
                                                                             )
                                                    }
                                            className={classes.listItem}
                                        >
                                            <ListItemIcon
                                                className={classes.menuIcon}
                                            >
                                                <collapsibleItem.icon />
                                            </ListItemIcon>
                                            <ListItemText
                                                inset={true}
                                                primary={collapsibleItem.name}
                                                classes={{primary: classes.menuText}}
                                            />
                                            {props.activeMenuItem.collapsibleId === collapsibleItem.id ?
                                            <ExpandLessIcon className={classes.menuIcon}/> : <ExpandMoreIcon className={classes.menuIcon}/>}
                                        </ListItem>
                                        {
                                            <Collapse
                                                in={props.state === SidebarState.opened &&
                                                props.activeMenuItem.collapsibleId === collapsibleItem.id}
                                                timeout="auto"
                                                unmountOnExit={true}
                                            >
                                                {
                                                    collapsibleItem.routes.map((cRoute, index) => (
                                                        <NavLink
                                                            to={cRoute.path}
                                                            key={index}
                                                            className={classNames(classes.navlink)}
                                                            id={`navlink_${cRoute.path}`}
                                                            onClick={props.onMenuClicked.bind(this,
                                                                                              {
                                                                                                    collapsibleId: collapsibleItem.id,
                                                                                                    menuId: `navlink_${cRoute.path}`,
                                                                                                    title: cRoute.title,
                                                                                                })
                                                                    }
                                                        >
                                                            <ListItem
                                                                button={true}
                                                                className={classNames(
                                                                    classes.listItem,
                                                                    props.activeMenuItem.menuId === `navlink_${cRoute.path}`
                                                                    && classes.activeMenu)}
                                                            >
                                                                <ListItemText
                                                                    inset={true}
                                                                    primary={cRoute.name}
                                                                    classes={{primary: classes.menuText}}
                                                                />
                                                            </ListItem>
                                                        </NavLink>
                                                    ))
                                                }
                                            </Collapse>
                                        }
                                    </>
                                );
                                } else {
                                    const routeItem: IRouteItem = route as IRouteItem;
                                    return (
                                        <NavLink
                                            to={routeItem.path}
                                            key={key}
                                            className={classNames(classes.navlink)}
                                            id={`navlink_${routeItem.path}`}
                                            onClick={props.onMenuClicked.bind(this, {menuId: `navlink_${routeItem.path}`,
                                                                                     title: routeItem.title})}
                                        >
                                            <ListItem
                                                key={`${routeItem.name}_${key}`}
                                                button={true}
                                                className={
                                                    classNames(
                                                    {
                                                        [classes.listItem]: true,
                                                        [classes.activeMenu]: props.activeMenuItem.menuId === `navlink_${routeItem.path}`
                                                        && props.state === SidebarState.opened,
                                                    })
                                                    }
                                            >
                                                <ListItemIcon
                                                    className={classes.menuIcon}
                                                >
                                                    <routeItem.icon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={routeItem.name}
                                                    classes={{primary: classes.menuText}}
                                                />
                                            </ListItem>
                                        </NavLink>);
                                }
                            })
                        }
                        </>);
                    })
                    }
                </List>
        </Scrollbar>
    </Drawer>
);

export default withStyles(styles, {withTheme: true})(Sidebar);
