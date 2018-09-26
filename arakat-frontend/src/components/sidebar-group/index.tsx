import { Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Theme,
    Typography, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
import { IRouteGroup } from "../../common/models/route/group";
import { IRouteItem } from "../../common/models/route/item";

const style: any = (theme: Theme) => ({
    menuGroup: {
        padding: "8px 24px 8px 24px",
    },
    menuTitle: {
        color: "rgba(255, 255, 255, 0.7)",
        fontWeight: 600,
    },
    listItem: {
        "&:hover": {
            backgroundColor: "rgba(245, 237, 237, 0.08)",
        },
        [theme.breakpoints.up("sm")]: {
            paddingLeft: 20,
          },
    },
    menuIcon: {
        color: "white",
    },
    menuText: {
        color: "white",
        fontSize: "1.2rem",
     },
    navlink: {
        color: "white",
    },
});

export interface ISidebarGroupProp {
    groupTitle?: JSX.Element;
    id: string;
    routeGroup: IRouteGroup;
}

type AllType = ISidebarGroupProp & WithStyles<"menuGroup" | "menuTitle" | "listItem" | "menuIcon" | "menuText" | "navlink">;

const SidebarGroupComponent: React.SFC<AllType> = ({classes, ...props}: AllType) => (
    <List
        key={props.id}
        subheader={
                    <ListSubheader
                        className={classes.menuTitle}
                    >
                        {props.groupTitle ? props.groupTitle : props.routeGroup.name}
                    </ListSubheader>
                }
    >
        {
            props.routeGroup && props.routeGroup.routes.map((route, key) => {
                const routeItem: IRouteItem = route as IRouteItem;
                return (
                    <NavLink
                        to={routeItem.path}
                        key={key}
                        className={classNames(classes.navlink)}
                        id={`navlink_${routeItem.path}`}
                    >
                        <ListItem
                            key={`${routeItem.name}_${key}`}
                            button={true}
                            className={
                                classNames(
                                {
                                    [classes.listItem]: true,
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
            })
        }
    </List>
);

export default withStyles(style, {withTheme: true})(SidebarGroupComponent);
