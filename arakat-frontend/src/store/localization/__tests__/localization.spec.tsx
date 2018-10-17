import { Messages } from "../../../localization";
import LocalizationLanguages, { ILocalizationLanguage } from "../../../localization/languages";
import { changeLanguage } from "../actions";

describe("redux in localization test", () => {
    const messageId: string = "login.title";
    let expectedOutput: string = "";

    test("should ouput en language", () => {
        const language: ILocalizationLanguage = LocalizationLanguages.English;
        expectedOutput = "LOGIN WITH YOUR ACCOUNT";
        const expectedAction: object = {
            payload: {
                locale : language,
            },
            type: "@@localization/CHANGE_LANGUAGE",
        };

        expect(changeLanguage(language, Messages.getMessages(language))).toEqual(expectedAction);
    });

    test("should ouput tr language", () => {
        const language: ILocalizationLanguage = LocalizationLanguages.Turkish;
        expectedOutput = "HESABINIZA GİRİŞ YAPIN";
        const expectedAction: object = {
            payload: {
                locale : language,
            },
            type: "@@localization/CHANGE_LANGUAGE",
        };

        expect(changeLanguage(language, Messages.getMessages(language))).toEqual(expectedAction);
    });
});
