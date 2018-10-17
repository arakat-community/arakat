import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";

/**
 * light theme options
 */
export const lightTheme: ThemeOptions = {
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: "#fafafa",
            },
        },
    },
    palette: {
        type: "light",
    },
};
