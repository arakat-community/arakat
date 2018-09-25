import { Theme } from "@material-ui/core";

const ITEM_HEIGHT: number = 48;

/**
 * this style got from https://material-ui.com/demos/autocomplete/
 * @param theme theme of mui
 */
export const styles: any = (theme: Theme) => ({
  "@global": {
    ".Select-control": {
      "&:hover": {
        boxShadow: "none",
      },
      "alignItems": "center",
      "background": "transparent",
      "border": 0,
      "display": "flex",
      "height": "auto",
    },
    ".Select--multi .Select-input": {
      margin: 0,
    },
    ".Select-multi-value-wrapper": {
      display: "flex",
      flexGrow: 1,
      flexWrap: "wrap",
    },
    ".Select.has-value.is-clearable.Select--single > .Select-control .Select-value": {
      padding: 0,
    },
    ".Select-input": {
      display: "inline-flex !important",
      height: "auto",
      padding: 0,
    },
    ".Select-input input": {
      background: "transparent",
      border: 0,
      cursor: "default",
      display: "inline-block",
      fontFamily: "inherit",
      fontSize: "inherit",
      margin: 0,
      outline: 0,
      padding: 0,
    },
    ".Select-placeholder, .Select--single .Select-value": {
      alignItems: "center",
      bottom: 0,
      display: "flex",
      fontFamily: theme.typography.fontFamily,
      fontSize: "1.5rem",
      left: 0,
      padding: 0,
      position: "absolute",
      right: 0,
      top: 0,
    },
    ".Select-placeholder": {
      color: "rgba(0, 0, 0, 0.54)",
      // opacity: 0.42,
    },
    ".Select-menu-outer": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      left: 0,
      maxHeight: ITEM_HEIGHT * 4.5,
      position: "absolute",
      top: "auto",
      bottom: `calc(100% + ${theme.spacing.unit}px)`,
      width: "100%",
      zIndex: 2,
    },
    ".Select-noresults": {
      padding: theme.spacing.unit * 2,
    },
    ".Select.is-focused:not(.is-open) > .Select-control": {
      boxShadow: "none",
    },
    ".Select-menu": {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: "auto",
    },
    ".Select-menu div": {
      boxSizing: "content-box",
    },
    ".Select-arrow-zone, .Select-clear-zone": {
      color: theme.palette.action.active,
      cursor: "pointer",
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // only for screen readers. We can't use display none.
    ".Select-aria-only": {
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      position: "absolute",
      width: 1,
    },
  },
  "chip": {
      margin: theme.spacing.unit / 4,
  },
  "root": {
      flexGrow: 1,
      marginTop: 16,
      marginBottom: 8,
      // height: 250,
  },
});
