import { Theme } from "@material-ui/core";

export const styles: any = (theme: Theme) => ({
    activeMenu: {
        backgroundColor: "#ffffff21",
    },
    appNameArea: {
        color: "white",
        lineHeight: "1.5em",
        marginLeft: 8,
        display: "flex",
    },
    appName: {
        color: "#ff991c",
        lineHeight: "1.5em",
    },
    appBrand: {
        color: "white",
        lineHeight: "1.5em",
    },
    brand: {
        width: "100%",
    },
    brandClosed: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    },
    brandOpened: {
        alignItems: "center",
        display: "flex",
        paddingLeft: 8,
    },
    collapseIcon: {
        color: "white",
    },
    drawerPaper: {
        backgroundColor: "rgb(48, 48, 48)",
        overflow: "hidden",
        overflowAnchor: "none",
        padding: 0,
        position: "relative",
        transition: theme.transitions.create("width", {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.sharp,
            }),
        whiteSpace: "nowrap",
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 32,
          },
        [theme.breakpoints.down("xs")]: {
            width: `calc(100vw - 45px)`,
          },
      },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          duration: theme.transitions.duration.leavingScreen,
          easing: theme.transitions.easing.sharp,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up("sm")]: {
          width: (theme.spacing.unit * 8),
        },
      },
    hide: {
        display: "none",
    },
    listItem: {
        "&:hover": {
            backgroundColor: "rgba(245, 237, 237, 0.08)",
        },
        [theme.breakpoints.up("sm")]: {
            paddingLeft: 20,
          },
    },
    logo: {
        height: 32,
        width: 32,
        [theme.breakpoints.up("sm")]: {
            height: 32,
            width: 32,
          },
        },
    menuDivider: {
        backgroundColor: "rgba(255, 255, 255, 0.26)",
    },
    menuGroup: {
        padding: "8px 24px 8px 24px",
    },
    menuIcon: {
        color: "white",
    },
    menuText: {
       color: "white",
       fontSize: "1.2rem",
    },
    menuTitle: {
        color: "rgba(255, 255, 255, 0.7)",
        fontWeight: 600,
    },
    navlink: {
        color: "white",
    },
    toolbar: {
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, .05)",
        boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
        display: "flex",
        flex: "0 1 auto",
        justifyContent: "space-between",
        width: "100%",
        ...theme.mixins.toolbar,
      },
});
