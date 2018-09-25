import { List, ListItem, ListItemText, Theme, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { defineMessages, InjectedIntlProps, injectIntl } from "react-intl";
import { NavLink } from "react-router-dom";

const style: any = (theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
    },
    activeLink: {
        fontWeight: 600,
    },
    home: {
        paddingRight: 0,
        paddingLeft: 0,
    },
    item: {
        "&::before": {
            content: "\">\"",
            paddingLeft: 16,
            paddingRight: 16,
            color: theme.palette.text.primary,
        },
        "paddingRight": 0,
        "paddingLeft": 0,
    },
    itemText: {
        paddingRight: 0,
        paddingLeft: "0 !important",
    },
});

export interface IBreadcrumb {
    title: JSX.Element | string;
    to: string;
    active: boolean;
}

export interface IBreadCrumbsProps {
    paths: IBreadcrumb[];
}

const localMessages: any = defineMessages({
    home: {
        id: "breadcrumbs.breadcrumb.home",
    },
  });

type AllType = IBreadCrumbsProps & WithStyles<"root" | "item" | "itemText" | "home" | "activeLink"> & InjectedIntlProps;

const BreadCrumbsComponent: React.SFC<AllType> = ({classes, ...props}: AllType) => (
    <List className={classes.root}>
        <NavLink
            to="/"
            key="home-page"
        >
            <ListItem
                className={classes.home}
            >
                <ListItemText
                    className={classes.itemText}
                    inset={true}
                    primary={props.intl.formatMessage(localMessages.home)}
                />
            </ListItem>
        </NavLink>
        {
            props.paths.map((path) => (
                <NavLink
                    to={path.to}
                    key={path.to}
                >
                    <ListItem
                        className={classes.item}
                    >
                        <ListItemText
                            className={classNames({
                                [classes.itemText]: true,
                                [classes.activeLink]: path.active,
                            })}
                            inset={true}
                            primary={path.title}
                        />
                    </ListItem>
                </NavLink>
            ))
        }
    </List>
);

export default withStyles(style, {withTheme: true})(injectIntl(BreadCrumbsComponent));
