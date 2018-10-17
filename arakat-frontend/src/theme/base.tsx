import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { ILocalizationLanguage } from "../localization/languages";

export const baseTheme: (locale: ILocalizationLanguage) => ThemeOptions = (locale: ILocalizationLanguage) => {
    const  themeOpt: ThemeOptions = {
        direction: locale.rtl ? "rtl" : "ltr",
        overrides: {
            MuiAppBar: {
                root: {
                    padding: 0,
                },
            },
            MuiButton: {
                root: {
                    fontSize: "1.25rem",
                },
                textPrimary: {
                    color: "#2196f3",
                },
            },
            MuiFormHelperText: {
                root: {
                    fontSize: "1.125rem",
                },
            },
            MuiFormLabel: {
                root: {
                    fontSize: "1.4rem",
                },
            },
            MuiInput: {
                root: {
                    fontSize: "1.6rem",
                },
            },
            MuiMenuItem: {
                root: {
                    fontSize: "1.2rem",
                },
            },
            MuiPaper: {
                root: {
                    padding: 12,
                },
            },
            MuiListItemText: {
                dense: {
                    fontSize: "1.2125rem",
                },
            },
            MuiTableCell: {
                body: {
                    fontSize: "1.3rem",
                },
                head: {
                    fontSize: "1.2rem",
                },
            },
            MuiToolbar: {
                root: {
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                },
            },
            MuiTooltip: {
                tooltip: {
                    fontSize: "0.850rem",
                },
            },
            MuiTypography: {
                body1: {
                    fontSize: "1.3rem",
                },
                body2: {
                    fontSize: "1.4rem",
                },
                button: {
                    root: {
                        fontSize: "1.4rem",
                    },
                },
                caption: {
                    fontSize: "1.2rem",
                },
                display1: {
                    fontSize: "3.4rem",
                },
                display2: {
                    fontSize: "4.5rem",
                },
                display3: {
                    fontSize: "5.6rem",
                },
                display4: {
                    fontSize: "11.2rem",
                },
                headline: {
                    fontSize: "2.4rem",
                },
                subheading: {
                    fontSize: "1.6rem",
                },
                title: {
                    fontSize: "2.1rem",
                },
            },
            MuiListSubheader: {
                root: {
                    fontSize: "1.25rem",
                },
            },
            MuiChip: {
                root: {
                    fontSize: "1rem",
                },
            },
        },
        typography: {
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        },
    };

    return themeOpt;
};
