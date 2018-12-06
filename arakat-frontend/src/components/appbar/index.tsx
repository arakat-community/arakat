import Img from "@fdmg/ts-react-image";
import { AppBar as MuiAppBar, Button, Theme, Toolbar, WithStyles, withStyles, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { IRouteGroup } from "../../common/models/route/group";
import HorizontalMenuComponent from "../horizontal-menu";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

const styles: any = (theme: Theme) => ({
    sidebarClosed: {
        width: `calc(100% - ${(theme.spacing.unit * 7)}px)`,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${(theme.spacing.unit * 8)}px)`,
        },
    },
    sidebarPinned: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${(theme.spacing.unit * 32)}px)`,
        },
    },
    toolbarRightItems: {
        alignItems: "center",
        display: "flex",
        flexFlow: "row",
    },
    logo: {
        height: theme.spacing.unit * 5,
        width: theme.spacing.unit * 22,
    },
    navigation: {
        position: "absolute",
        left: theme.spacing.unit * 12,
    },
});

export interface IAppBarProps {
    breadCrumb?: JSX.Element;
    children: any;
    routes?: IRouteGroup[];
    logoUrl: string;
    onLogoClick: () => void;
}

type PropsWithStyle = RouteComponentProps<any> & IAppBarProps & WithStyles<"sidebarClosed" | "sidebarPinned" | "toolbarRightItems" | "logo" | "navigation">;

const navigate = (history: History, link) => {
    history.go(link)
}

const AppBar: React.SFC<PropsWithStyle> = ({ classes, ...props }: PropsWithStyle) => (
    <MuiAppBar
        position="absolute"
    >
        <Toolbar>
            <Button
                onMouseEnter={props.onLogoClick}
                onClick={props.onLogoClick}
            >
                <Img
                    src={props.logoUrl}
                    alt="logo"
                    className={classes.logo}
                />
            </Button>
            <div style={{ display: "flex" }}>
                <NavLink
                    to="/"
                    key="home-page1"
                    id="home-page1"
                    onClick={navigate.bind(this, props.history, "/")}
                >
                    <ListItem
                        button={true}
                    >
                        <ListItemText
                            primary={"Çizge Akışı Oluşturma"}
                        />
                    </ListItem>
                </NavLink>
                <NavLink
                    to="/chart-decision"
                    key="home-page"
                    id="home-page"
                    onClick={navigate.bind(this, props.history, "/chart-decision")}
                >
                    <ListItem
                        button={true}
                    >
                        <ListItemText
                            primary={"Sonuç Görüntüleme"}
                        />
                    </ListItem>
                </NavLink>
            </div>
            <div
                className={classes.navigation}
            >
                <HorizontalMenuComponent
                    routes={props.routes}
                />
            </div>
            <div
                className={classes.toolbarRightItems}
            >
                {props.children}
            </div>
        </Toolbar>
    </MuiAppBar>
);

export default withStyles(styles, { withTheme: true })(withRouter(AppBar));
