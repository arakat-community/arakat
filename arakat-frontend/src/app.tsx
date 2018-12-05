import { MuiThemeProvider } from "@material-ui/core";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { Location } from "history";
import { create } from "jss";
import rtl from "jss-rtl";
import React, { } from "react";
import { JssProvider } from "react-jss";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { ITheme } from "./common/models/theme";
import { ILocalizationLanguage } from "./localization/languages";
import { IApplicationState } from "./store";
import { getTheme } from "./theme";
import MainView from "./views/main";

export interface IAppState {
    location: Location;
    locale: ILocalizationLanguage;
    theme: ITheme;
}

type AllTypes = IAppState & RouteComponentProps<any>;

const preset: any = jssPreset().plugins;
const jss: any = create({ plugins: [...preset, rtl()] });
const generateClassName: any = createGenerateClassName();

const App: React.SFC<AllTypes> = (props: AllTypes) => {
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
    ({
        location: state.routing.location,
        locale: state.localization.locale,
        theme: state.appConfig.theme,
    });

export default connect<IAppState, undefined, {}, IApplicationState>(mapStateToProps)(withRouter(App));