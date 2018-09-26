import {
  createGenerateClassName,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jssPreset from "@material-ui/core/styles/jssPreset";
import JssProvider from "react-jss/lib/JssProvider";
import { Location } from "history";
import {get as getCookie} from "es-cookie";
import { create, JSSOptions } from "jss";
import { theme } from "./arakat-frontend/theme";
import rtl from "jss-rtl";
import React, { Component, ReactElement } from "react";
import { connect } from "react-redux";
import SecureRoute from "./arakat-frontend/src/components/route/secure";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router";
import { ILocalizationLanguage } from "./arakat-frontend/src/localization/languages";
import { IApplicationState } from "./arakat-frontend/src/store";
import { IAuthenticationState } from "./arakat-frontend/src/store/authentication/types";
import LoginView from "./arakat-frontend/src/views/login";
import MainView from "./arakat-frontend/src/views/main";



export interface IAppState {
  location: Location;
  locale: ILocalizationLanguage;
  authentication?: IAuthenticationState;
}

type AllTypes = IAppState & RouteComponentProps<IAppState>;
const test: any = jssPreset().plugins;
const jss: any = create({ plugins: [...test, rtl()] });

const generateClassName: any = createGenerateClassName();

const getTheme: (locale: ILocalizationLanguage) => Theme = (
  locale: ILocalizationLanguage,
) => {
  const theme: Theme = createMuiTheme({
    direction: locale.rtl ? "rtl" : "ltr",
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: "#fafafa",
        },
        root: {
          padding: 0,
        },
      },
      MuiButton: {
        root: {
          fontSize: "1.25rem",
        },
      },
      MuiPaper: {
        root: {
          padding: 12,
        },
      },
      MuiToolbar: {
        root: {
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        },
      },
    },
    typography: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    },
  });

  return theme;
};

const app: React.SFC<AllTypes> = (props: AllTypes) => {
  document.body.setAttribute("dir", props.locale.rtl ? "rtl" : "ltr");
  return (
<JssProvider
            jss={jss}
            generateClassName={generateClassName}
    >
            <MuiThemeProvider
                theme={theme(props.theme, props.locale)}
            >
                <Switch>
                    <Route
                        path="/"
                        component={LoginView}
                    />
                    <SecureRoute
                        authenticated={
                                getCookie("access_token") !== undefined && getCookie("access_token") !== null
                                }
                        loginPath="/login"
                    >
                        <Route
                            path="/"
                            component={MainView}
                        />
                    </SecureRoute>
                </Switch>
            </MuiThemeProvider>
    </JssProvider>
  );
};

const mapStateToProps: (state: IApplicationState) => IAppState = (
  state: IApplicationState,
): IAppState => ({
  authentication: state.authentication,
  locale: state.localization.locale,
  location: state.routing.location,
});

export default withRouter(
  connect<IAppState, {}, IAppState>(mapStateToProps)(app),
);
