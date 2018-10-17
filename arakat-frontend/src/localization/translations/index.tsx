import {addLocaleData} from "react-intl";
import arLocale from "react-intl/locale-data/ar";
import enLocale from "react-intl/locale-data/en";
import trLocale from "react-intl/locale-data/tr";
import LocalizationLanguages from "../languages";

/**
 * interface that is used for locale message configuration
 */
export interface ILocaleMessage {
    locale: ReactIntl.Locale[];
    messages: object;
}

/**
 * locale message configurations. whenever a new locale message wanted to add to the system it must be defined in that interface
 */
export interface ILocaleMessages {
    Ar: ILocaleMessage;
    En: ILocaleMessage;
    Tr: ILocaleMessage;
}

const getTranslatedMessages: any = (languageCode: string) => {
    const messages: object = {};

    switch (languageCode) {
        case LocalizationLanguages.Arabic.code:
        Object.assign(messages,
                      require("./response-message-codes/ar"),
                      require("./menu-items/ar"),
                      require("./not-found-view/ar"),
                      require("./grid-columns/ar"),
                      require("./breadcrumbs/ar"),
                      require("./data-grid/ar"));
        break;
        case LocalizationLanguages.English.code:
        Object.assign(messages,
                      require("./menu-items/en"),
                      require("./response-message-codes/en"),
                      require("./not-found-view/en"),
                      require("./dialog-component/en"),
                      require("./grid-columns/en"),
                      require("./form-elements/en"),
                      require("./breadcrumbs/en"),
                      require("./worksheet/en"),
                      require("./data-grid/en"));
        break;
        case LocalizationLanguages.Turkish.code:
        Object.assign(messages,
                      require("./response-message-codes/tr"),
                      require("./not-found-view/tr"),
                      require("./dialog-component/tr"),
                      require("./menu-items/tr"),
                      require("./action-buttons/tr"),
                      require("./grid-columns/tr"),
                      require("./form-elements/tr"),
                      require("./breadcrumbs/tr"),
                      require("./worksheet/tr"),
                      require("./data-grid/tr"));
        break;
    }

    return messages;
};

/**
 * translated messages which is used by languages
 */
const TranslatedMessages: ILocaleMessages = {
    Ar: {locale: arLocale, messages: getTranslatedMessages(LocalizationLanguages.Arabic.code)},
    En: {locale: enLocale, messages: getTranslatedMessages(LocalizationLanguages.English.code)},
    Tr: {locale: trLocale, messages: getTranslatedMessages(LocalizationLanguages.Turkish.code)},
};

addLocaleData([
    ...arLocale,
    ...enLocale,
    ...trLocale,
]);

export default TranslatedMessages;
