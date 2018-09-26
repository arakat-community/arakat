import {createMuiTheme, Theme} from "@material-ui/core";
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {defaultsDeep} from "lodash";
import {ITheme} from "../src/common/models/theme";
import {ILocalizationLanguage} from "../src/localization/languages";
import { baseTheme } from "./base";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export const theme: (theme: ITheme, locale: ILocalizationLanguage) => Theme = (theme: ITheme, locale: ILocalizationLanguage) => {
    let themeOptions: ThemeOptions = baseTheme(locale);
    switch (theme.type) {
        case "dark":
            themeOptions = defaultsDeep(themeOptions, darkTheme);
            break;
        case "light":
            themeOptions = defaultsDeep(themeOptions, lightTheme);
            break;
        default:
            break;
    }

    const appTheme: Theme = createMuiTheme(themeOptions);

    return appTheme;
};
