import { Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";

const styles: any = (theme: Theme) => ({
    hr: {
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        border: "none",
        borderLeft:    "1px solid",
        height: "5vh",
        marginLeft: 2,
        marginRight: 2,
        width: 1,
    },
});

type AllProps = WithStyles<"hr">;

const VerticalDivier: React.SFC<AllProps> = ({classes, ...props}: AllProps) => (<hr className={classes.hr}/>);

export default withStyles(styles, {withTheme: true})(VerticalDivier);
