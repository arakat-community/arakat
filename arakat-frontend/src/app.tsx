import { MuiThemeProvider, Theme } from "@material-ui/core";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import {get as getCookie} from "es-cookie";
import {Location} from "history";
import { create } from "jss";
import rtl from "jss-rtl";
import React, {} from "react";
import JssProvider from "react-jss/lib/JssProvider";
import {connect} from "react-redux";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router";
import { ITheme } from "./common/models/theme";
import SecureRoute from "./components/route/secure";
import { ILocalizationLanguage } from "./localization/languages";
import {IApplicationState} from "./store";
import { IAuthenticationState } from "./store/authentication/types";
import { getTheme } from "./theme";
import LoginView from "./views/login/index";
import MainView from "./views/main";

export interface IAppState {
  authentication?: IAuthenticationState;
  location: Location;
  locale: ILocalizationLanguage;
  theme: ITheme;
}

type AllTypes = IAppState & RouteComponentProps <IAppState>;

const preset: any = jssPreset().plugins;
const jss: any = create({ plugins: [...preset, rtl()] });
const generateClassName: any = createGenerateClassName();

const app: React.SFC <AllTypes> = (props: AllTypes) => {
  document.body.setAttribute("dir", props.locale.rtl ? "rtl" : "ltr");
  return (
    <JssProvider
            jss={jss}
            generateClassName={generateClassName}
    >
            <MuiThemeProvider
                theme={getTheme(props.theme, props.locale)}
            >
                <Switch>
                    <Route
                        path="/login"
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

const mapStateToProps: (state: IApplicationState) => IAppState = (state: IApplicationState): IAppState =>
({location: state.routing.location, authentication: state.authentication, locale: state.localization.locale, theme: state.appConfig.theme});

export default withRouter(connect<IAppState, {}, IAppState>(mapStateToProps)(app));
