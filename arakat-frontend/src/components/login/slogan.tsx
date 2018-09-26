import Img from "@fdmg/ts-react-image";
import { Hidden, Theme, WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";

export interface ISloganProps {
    appBrand: string;
    appName: string;
    appLogo: string;
    title: string | JSX.Element;
    subtitle: string | JSX.Element;
}

const style: any = (theme: Theme) => ({
    appNameArea: {
        alignItems: "center",
        color: "white",
        lineHeight: "1.5em",
        display: "flex",
    },
    appName: {
        color: "#ff991c",
        lineHeight: "1.5em",
    },
    appBrand: {
        color: "white",
        lineHeight: "1.5em",
        paddingLeft: theme.spacing.unit,
    },
    logo: {
        width: 64,
    },
    root: {
        [theme.breakpoints.up("xl")]: {
            padding: `26rem`,
        },
        [theme.breakpoints.up("lg")]: {
            padding: `24rem`,
        },
        [theme.breakpoints.down("md")]: {
            alignItems: "center",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
        },
    },
    text: {
        color: "white",
        marginTop: theme.spacing.unit,
    },
});

type PropsWithStyles = ISloganProps & WithStyles <"root" | "logo" | "text" | "appNameArea" | "appName" | "appBrand">;

const slogan: React.SFC<ISloganProps> = ({
    classes,
    ...props,
}: PropsWithStyles) => (
    <div className={classes.root}>
        <div className={classes.appNameArea}>
            <Img src={props.appLogo} alt="logo" className={classes.logo}/>
                <Typography
                        variant="display3"
                        className={classes.appNameArea}
                >
                    <Typography
                        variant="display3"
                        className={classes.appBrand}
                        component="span"
                    >
                        {props.appBrand.toUpperCase()}
                    </Typography>
                    <Typography
                        variant="display3"
                        component="span"
                        className={classes.appName}
                    >
                        {props.appName.toUpperCase()}
                    </Typography>
                </Typography>
        </div>
        <Typography variant="title" gutterBottom={true} className={classes.text}>
            {props.title}
        </Typography>
        <Hidden mdDown={true}>
            <Typography variant="subheading" gutterBottom={true} className={classes.text}>
                {props.subtitle}
            </Typography>
        </Hidden>
    </div>
);

export default withStyles(style, { withTheme: true })(slogan);
