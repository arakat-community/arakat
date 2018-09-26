import {Action} from "redux";
import { ITheme } from "../../common/models/theme";
import { ThemeType } from "../../common/models/theme/type";

export interface IApplicationConfigState {
    appBrand: string;
    appName: string;
    appLogo: string;
    theme: ITheme;
}

export interface IChangeAppLogo extends Action {
    payload: {
        appLogo: string,
    };
    type: "@@app/CHANGE_APP_LOGO";
}

export interface IChangeAppName extends Action {
    payload: {
        appName: string,
    };
    type: "@@app/CHANGE_APP_NAME";
}

export interface IChangeAppBrand extends Action {
    payload: {
        appBrand: string,
    };
    type: "@@app/CHANGE_APP_BRAND";
}

export interface IChangeTheme extends Action {
    payload: {
        theme: ITheme,
    };
    type: "@@app/CHANGE_THEME";
}

export type AppConfigActions = IChangeTheme | IChangeAppName | IChangeAppLogo | IChangeAppBrand;
