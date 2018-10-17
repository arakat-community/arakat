import {Reducer} from "redux";
import LocalizationLanguages from "../../localization/languages";
import { AppConfigActions, IApplicationConfigState } from "./types";

export const initialState: IApplicationConfigState  = {
    appLogo: "/assets/images/logo.png",
    appName: "BI",
    appBrand: "ASTAR",
    theme: {
        type: "light",
    },
};

const reducer: Reducer<IApplicationConfigState> = (state: IApplicationConfigState = initialState, action: AppConfigActions) => {
    switch (action.type) {
        case "@@app/CHANGE_THEME":
            return {
                ...state,
                theme: action.payload.theme,
            };
        case "@@app/CHANGE_APP_NAME":
            return {
                ...state,
                appName: action.payload.appName,
            };
        case "@@app/CHANGE_APP_LOGO":
            return {
                ...state,
                appLogo: action.payload.appLogo,
            };
        case "@@app/CHANGE_APP_BRAND":
            return {
                ...state,
                appBrand: action.payload.appBrand,
            };
        default:
            return {
                ...state,
            };
    }
};

export default reducer;
