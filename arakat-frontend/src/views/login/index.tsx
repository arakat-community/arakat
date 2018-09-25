import Grid from "@material-ui/core/Grid";
import {Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emptyString } from "react-select/lib/utils";
import Panel from "../../containers/login/panel";
import Slogan from "../../containers/login/slogan";
import Snackbar from "../../containers/snackbar";
import { IApplicationState } from "../../store";
import { IApplicationConfigState } from "../../store/app/types";

const style: any = (theme: Theme) => ({
    "@global": {
        body: {
            background: "url(/assets/images/login/1background.jpg) no-repeat",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "102vh",
            overflow: "hidden",
        },
        html: {
            fontSize: "62.5%",
        },
    },
    [theme.breakpoints.down("md")]: {
        panel: {
            maxWidth: "80%",
        },
        root: {
            alignItems: "center",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            margin: 0,
        },
      },
    "root": {
        width: "100%",
    },
    "rootIE10Fix": {
        display: "-ms-flexbox",
    },
});

interface ILoginViewProps {
    appConfig: IApplicationConfigState;
}

type PropsWithStyles = ILoginViewProps & WithStyles <"root" | "panel" | "rootIE10Fix">;

const loginView: React.SFC <PropsWithStyles> = ({
    classes,
    ...props,
}: PropsWithStyles) => (
    <>
        <Grid
            container={true}
            spacing={24}
            className={
                classNames({
                    [classes.rootIE10Fix]: true,
                    [classes.root]: true,
                })
            }
        >
            <Grid
                item={true}
                xs={8}
            >
                <Slogan
                    appName={props.appConfig.appName}
                    appBrand={props.appConfig.appBrand}
                    title={
                            <FormattedMessage
                                id="slogan.title"
                            />
                        }
                    subtitle={
                            <FormattedMessage
                                id="slogan.title"
                            />
                        }
                    appLogo={props.appConfig.appLogo}
                />
            </Grid>
            <Grid
                item={true}
                xs={4}
                className={classes.panel}
            >
                <Panel />
            </Grid>
        </Grid>
        <Snackbar />
    </>
);

const mapStateToProps: (state: IApplicationState) => ILoginViewProps = (state: IApplicationState):
ILoginViewProps => ({appConfig: state.appConfig});

export default connect<ILoginViewProps>(mapStateToProps)(withStyles(style, { withTheme: true })(loginView));
