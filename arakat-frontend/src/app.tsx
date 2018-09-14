import {
  createGenerateClassName,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jssPreset from "@material-ui/core/styles/jssPreset";
import { Location } from "history";
import { create, JSSOptions } from "jss";
import rtl from "jss-rtl";
import React, { Component, ReactElement } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router";
import { push } from "react-router-redux";
import { Dispatch } from "redux";
import SecureRoute from "./components/route/secure";
import { ILocalizationLanguage } from "./localization/languages";
import { IApplicationState } from "./store";
import { IAuthenticationState } from "./store/authentication/types";
import NotFoundView from "./views/error/not-found";
import Test2View from "./views/test2";

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
    <MuiThemeProvider theme={getTheme(props.locale)}>
      <Switch>
        <Route path="/" component={Test2View} /> {/*render edilecek sınıf*/}
      </Switch>
    </MuiThemeProvider>
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
