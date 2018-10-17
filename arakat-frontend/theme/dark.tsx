import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";

/**
 * black theme options
 */
export const darkTheme: ThemeOptions = {
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: "#424242",
            },
        },
    },
    palette: {
        type: "dark",
    },
};
