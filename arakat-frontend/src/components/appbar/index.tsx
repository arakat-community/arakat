import Img from "@fdmg/ts-react-image";
import { AppBar as MuiAppBar, Button, Theme, Toolbar, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import { IRouteGroup } from "../../common/models/route/group";
import HorizontalMenuComponent from "../horizontal-menu";

const styles: any = (theme: Theme) => ({
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

type PropsWithStyle = IAppBarProps & WithStyles<"toolbarRightItems" | "logo" | "navigation">;

const AppBar: React.SFC<IAppBarProps> = ({classes, ...props}: PropsWithStyle) => (
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

export default withStyles(styles, {withTheme: true})(AppBar);
