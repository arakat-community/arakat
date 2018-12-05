import { Theme, WithStyles, withStyles } from "@material-ui/core";
import React, {Component} from "react";
import { RouteComponentProps } from "react-router";
import { IAppState } from "../../app";

const style: any = (theme: Theme) => ({
    "@global": {
        body: {
            margin: 0,
        },
        html: {
            fontSize: "62.5%",
        },
        main: {
            display: "block",
        },
    },
    "appFrame": {
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        width: "100%",
        zIndex: 1,
    },
    "root": {
        flexGrow: 1,
    },
});

export interface ILayoutProps {
    children: any;
}

type PropWithStyles = ILayoutProps & WithStyles<"root" | "appFrame" | "content" | "toolbar"> & RouteComponentProps <IAppState>;

/**
 * application's layout class that renders routes and owns main to display other views
 */
class Layout extends Component<PropWithStyles, {}> {

      /**
       * renders output
       */
    public render(): JSX.Element {
        const { classes } = this.props;

        return (
          <div className={classes.root}>
            <div className={classes.appFrame}>
                {this.props.children}
            </div>
          </div>
        );
      }
}

export default withStyles(style, { withTheme: true })(Layout);
