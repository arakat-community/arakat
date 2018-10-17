import {Action} from "redux";
import { ILocalizationLanguage } from "../../localization/languages";

export interface ILocalizationState {
    messages: object;
    locale: ILocalizationLanguage;
}

export interface IChangeLanguage extends Action {
    type: "@@localization/CHANGE_LANGUAGE";
    payload: {
        locale: ILocalizationLanguage,
    };
}

export type LocalizationActions = IChangeLanguage;
