import LocalizationLanguages, { ILocalizationLanguage } from "./languages";
import TranslatedMessages from "./translations";

/**
 * This class responsible for returning translated messages to components
 */
export class Messages {
    /**
     * returns translated messages according to language param
     * while adding a new language to messages, do not forget to assign default language's messages.
     * @param language localization language
     */
    public static getMessages(language: ILocalizationLanguage): object {
        switch (language.code) {
            case LocalizationLanguages.English.code:
                return Object.assign({}, TranslatedMessages.Tr.messages, TranslatedMessages.En.messages);
            case LocalizationLanguages.Turkish.code:
                return TranslatedMessages.Tr.messages;
            case LocalizationLanguages.Arabic.code:
                return Object.assign({}, TranslatedMessages.Tr.messages, TranslatedMessages.Ar.messages);
            default:
                return TranslatedMessages.Tr.messages;
        }
    }
}

export const getLocale: (languageCode: string) => ILocalizationLanguage = (languageCode: string) => {
    const locale: ILocalizationLanguage = LocalizationLanguages.AllLanguages.find((language) => language.code === languageCode);
    return locale && TranslatedMessages[locale.code]
        ? locale
        :  LocalizationLanguages.DefaultLanguage;
};
