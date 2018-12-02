import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";

/**
 * black theme options
 */
export const darkTheme: ThemeOptions = {
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                // backgroundColor: "#424242",
                backgroundColor: "white",

            },
        },        
        MuiDialog: {
            paper: {
                backgroundColor: '#545C61',
                outline: 'none'
            }
        },
        MuiDrawer: {
            paper: {
                backgroundColor: '#E56364'
            },
        }
    },
    palette: {
        type: "dark",
    },
};
