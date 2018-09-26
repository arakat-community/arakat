import { ActionCreator } from "redux";
import { ILocalizationLanguage } from "../../localization/languages";
import {IChangeLanguage} from "./types";

export const changeLanguage: ActionCreator<IChangeLanguage> = (locale: ILocalizationLanguage) => ({
    payload: {
        locale,
    },
    type: "@@localization/CHANGE_LANGUAGE",
});
