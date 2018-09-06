import Img from "@fdmg/ts-react-image";
import {
    AppBar as MuiAppBar,
    Button,
    Theme,
    Toolbar,
    Typography,
    WithStyles,
    withStyles,
} from "@material-ui/core";
import React from "react";
import { IRouteGroup } from "../../common/models/route/group";

const styles: any = (theme: Theme) => ({
    flex: {
        flexGrow : 1,
    },
    logo: {
        height: theme.spacing.unit * 5,
        width: theme.spacing.unit * 5,
    },
    navigation: {
        left: theme.spacing.unit * 12,
        position: "absolute",
    },
    toolbarRightItems: {
        alignItems: "center",
        display: "flex",
        flexFlow: "row",
    },
});

export interface IAppBarProps {
    children: any;
    routes: IRouteGroup[];
    logoUrl: string;
    onLogoClick: () => void;
    title: string;
}

type PropsWithStyle = IAppBarProps & WithStyles<"flex" | "toolbarRightItems" | "logo" | "navigation">;

const AppBar: React.SFC<IAppBarProps> = ({classes, ...props}: PropsWithStyle) => (

    <MuiAppBar position = "absolute" color = "default">
        <Toolbar>
            <Button
                onClick = { props.onLogoClick }
            >
                <Img
                    src = { props.logoUrl }
                    alt = "logo"
                    className = { classes.logo }
                />
            </Button>

            <Typography variant="title" color="inherit" className = {classes.flex}>
                {props.title}
            </Typography>

            <div className = {classes.toolbarRightItems}>
                {props.children}
            </div>

        </Toolbar>
    </MuiAppBar>
);

export default withStyles(styles, {withTheme : true})(AppBar);
