import {ActionCreator} from "redux";
import { ITheme } from "../../common/models/theme/";
import { ThemeType } from "../../common/models/theme/type";
import { IChangeAppBrand, IChangeAppLogo, IChangeAppName, IChangeTheme } from "./types";

export const changeAppLogo: ActionCreator<IChangeAppLogo> = (appLogo: string) => ({
    payload: {
        appLogo,
    },
    type: "@@app/CHANGE_APP_LOGO",
});

export const changeAppName: ActionCreator<IChangeAppName> = (appName: string) => ({
    payload: {
        appName,
    },
    type: "@@app/CHANGE_APP_NAME",
});

export const changeAppBrand: ActionCreator<IChangeAppBrand> = (appBrand: string) => ({
    payload: {
        appBrand,
    },
    type: "@@app/CHANGE_APP_BRAND",
});

export const changeTheme: ActionCreator<IChangeTheme> = (theme: ITheme) => ({
    payload: {
        theme,
    },
    type: "@@app/CHANGE_THEME",
});
