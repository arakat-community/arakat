import {Grid, Theme, WithStyles, withStyles} from "@material-ui/core";
import React from "react";

const PageBodyViewComponent: React.SFC = (props) => (
    <Grid
        container={true}
    >
       {props.children}
    </Grid>
);

export default PageBodyViewComponent;
