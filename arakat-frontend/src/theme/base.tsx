import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { ILocalizationLanguage } from "../localization/languages";

export const baseTheme: (locale: ILocalizationLanguage) => ThemeOptions = (locale: ILocalizationLanguage) => {
    const  themeOpt: ThemeOptions = {
        direction: locale.rtl ? "rtl" : "ltr",
        overrides: {
            MuiAppBar: {
                root: {
                    padding: 0,
                    boxShadow: '1px 1px 6px #545C61'
                },
            },
            MuiButton: {
                root: {
                    color: 'black', // TODO: visible now.
                },
                textPrimary: {
                    color: "#2196f3",
                },
            },
            MuiFormHelperText: {
                root: {
                },
            },
            MuiFormLabel: {
                root: {
                },
            },
            MuiInput: {
                root: {
                },
            },
            MuiMenuItem: {
                root: {
                },
            },
            MuiPaper: {
                root: {
                    padding: 12
                },
            },
            MuiListItemText: {
                dense: {
                },
            },
            MuiTableCell: {
                body: {
                },
                head: {
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
                },
            },
            MuiTypography: {
                body1: {
                },
                body2: {
                },
                button: {
                    root: {
                    },
                },
                caption: {
                },
                display1: {
                },
                display2: {
                },
                display3: {
                },
                display4: {
                },
                headline: {
                },
                subheading: {
                },
                title: {
                }
            },
            MuiListSubheader: {
                root: {
                },
            },
            MuiChip: {
                root: {
                },
            },
            MuiDialogActions: {
                root: {
                    marginTop: '8vh',
                    marginRight: '43px',
                    marginLeft: '43px'
                }
            }
        },
        typography: {
            fontFamily: "Lemon Milk, Sans-Serif",

        },
    };

    return themeOpt;
};
