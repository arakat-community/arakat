import {addLocaleData} from "react-intl";
import arLocale from "react-intl/locale-data/ar";
import enLocale from "react-intl/locale-data/en";
import trLocale from "react-intl/locale-data/tr";
import LocalizationLanguages, { ILocalizationLanguage } from "./languages";

/**
 * Defines localization messages
 */
export class Messages {
    /**
     * translated messages
     * @param language localization language
     */
    public static getMessages(language: ILocalizationLanguage): object {
        switch (language.code) {
            case LocalizationLanguages.English.code:
                return this.en;
            case LocalizationLanguages.Turkish.code:
                return this.tr;
            case LocalizationLanguages.Arabic.code:
                return this.ar;
            default:
                return this.tr;
        }
    }

    private static en: object = require("./translations/en");
    private static tr: object = require("./translations/tr");
    private static ar: object = require("./translations/ar");

}

const locales: any = {
    ar: arLocale,
    en: enLocale,
    tr: trLocale,
};
addLocaleData([
    ...arLocale,
    ...enLocale,
    ...trLocale,
]);

export const getLocale: (languageCode: string) => ILocalizationLanguage = (languageCode: string) => {
    const langCode: string = languageCode;
    const locale: ILocalizationLanguage = LocalizationLanguages.AllLanguages.find((language) => language.code === languageCode);
    return locale && locales[locale.code]
        ? locale
        :  LocalizationLanguages.Turkish;
};
