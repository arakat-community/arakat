export interface ILocalizationLanguage {
    code: string;
    description: string | JSX.Element;
    rtl?: boolean;
}

/**
 * This class defines languages avaiable in application.
 * Language changer and other components that needs list of avaiable languaes uses this class
 */
class LocalizationLanguages {
    public static readonly Arabic: ILocalizationLanguage = {
        code: "ar",
        description: "عربى",
        rtl: true,
    };

    public static readonly English: ILocalizationLanguage = {
        code: "en",
        description: "English",
        rtl: false,
    };
    public static readonly Turkish: ILocalizationLanguage = {
        code: "tr",
        description: "Türkçe",
        rtl: false,
    };

    public static readonly DefaultLanguage: ILocalizationLanguage = LocalizationLanguages.Turkish;

    public static AllLanguages: ILocalizationLanguage[] = [
        LocalizationLanguages.Turkish,
        LocalizationLanguages.English,
        LocalizationLanguages.Arabic,
    ];
}

export default LocalizationLanguages;
