export interface ILocalizationLanguage {
    code: string;
    description: string | JSX.Element;
    rtl?: boolean;
}

/**
 * Language definitions
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

    public static AllLanguages: ILocalizationLanguage[] = [
        LocalizationLanguages.Turkish,
        LocalizationLanguages.English,
        LocalizationLanguages.Arabic,
    ];
}

export default LocalizationLanguages;
