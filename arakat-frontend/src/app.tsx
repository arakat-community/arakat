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
import { ILocalizationLanguage } from "./localization/languages";
import {IApplicationState} from "./store";
import { getTheme } from "./theme";
import MainView from "./views/main";
import WebFont from 'webfontloader';

export interface IAppState {
  location: Location;
  locale: ILocalizationLanguage;
  theme: ITheme;
}

type AllTypes = IAppState & RouteComponentProps <IAppState>;

const preset: any = jssPreset().plugins;
const jss: any = create({ plugins: [...preset, rtl()] });
const generateClassName: any = createGenerateClassName();

const app: React.SFC <AllTypes> = (props: AllTypes) => {
    WebFont.load({
        google: {
            families: ['Lemon Milk', 'Sans-Serif']
        }
    });
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
                            path="/"
                            component={MainView}
                        />
                    </Switch>
                </MuiThemeProvider>
        </JssProvider>
        );
};

const mapStateToProps: (state: IApplicationState) => IAppState = (state: IApplicationState): IAppState =>
({location: state.routing.location, locale: state.localization.locale, theme: state.appConfig.theme});

export default withRouter(connect<IAppState, {}, IAppState>(mapStateToProps)(app));
