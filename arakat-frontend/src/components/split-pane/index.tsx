import { Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import SplitPane from "react-split-pane";

const style: any = (theme: Theme) => ({
    "@global": {
        ".Resizer": {
            "background": "#000",
            "opacity": ".2",
            "zIndex": 1,
            "-moz-box-sizing": "border-box",
            "-webkit-box-sizing": "border-box",
            "boxSizing": "border-box",
            "-moz-background-clip": "padding",
            "-webkit-background-clip": "padding",
            "background-clip": "padding-box",
        },
        ".Resizer:hover": {
            "-webkit-transition": "all 2s ease",
            "transition": "all 2s ease",
        },
        ".Resizer.horizontal": {
            height: 11,
            margin: "-5px 0",
            borderTop: "5px solid rgba(255, 255, 255, 0)",
            borderBottom: "5px solid rgba(255, 255, 255, 0)",
            cursor: "row-resize",
            width: "100%",
        },
        ".Resizer.horizontal:hover": {
            borderTop: "5px solid rgba(0, 0, 0, 0.5)",
            borderBottom: "5px solid rgba(0, 0, 0, 0.5)",
        },
        ".Resizer.vertical": {
            width: 11,
            margin: "0 -5px",
            borderLeft: "5px solid rgba(255, 255, 255, 0)",
            borderRight: "5px solid rgba(255, 255, 255, 0)",
            cursor: "col-resize",
        },
        ".Resizer.vertical:hover": {
            borderLeft: "5px solid rgba(0, 0, 0, 0.5)",
            borderRight: "5px solid rgba(0, 0, 0, 0.5)",
        },
        ".Resizer.disabled": {
          cursor: "not-allowed",
        },
        ".Resizer.disabled:hover": {
          borderColor: "transparent",
        },
        ".vertical.Pane1": {
            height: "93vh",
        },
    },
    "root": {
        marginTop: theme.spacing.unit * -3,
    },
});

export interface ISplitPaneProps {
    firstPane: JSX.Element;
    secondPane: JSX.Element;
    thirdPane: JSX.Element;
    split: "vertical" | "horizontal";
}

type AllType = ISplitPaneProps & WithStyles<"root">;

/**
 * split pane component. this component will be updated and refactored with v2 version when released
 * @param param0 props
 */
const SplitPaneComponent: React.SFC<AllType> = ({classes, ...props}: AllType) => {
    if (props.split === "vertical") {
        return (
            <SplitPane
                className={classes.root}
                split={props.split}
                defaultSize={250}
                minSize={50}
                primary="first"
                allowResize={true}
            >
                {props.firstPane}
                <SplitPane
                    split={props.split}
                    primary="first"
                    defaultSize="80%"
                    minSize={50}
                >
                    {props.secondPane}
                    {props.thirdPane}
                </SplitPane>
            </SplitPane>
        );
    } else {
        return (
            <SplitPane
                    split={props.split}
                    defaultSize={115}
                    minSize={115}
                    maxSize={115}
                    primary="second"
                    allowResize={false}
            >
                <SplitPane
                    split={props.split}
                    primary="first"
                    defaultSize={100}
                    minSize={100}
                >
                    {props.firstPane}
                    {props.secondPane}
                </SplitPane>
                {props.thirdPane}
            </SplitPane>
        );
    }

};

export default withStyles(style, {withTheme: true})(SplitPaneComponent);
