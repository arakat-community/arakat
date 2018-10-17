import { Grid, Paper } from "@material-ui/core";
import React from "react";

const PageViewComponent: React.SFC = (props) => (
    <Paper>
        <Grid
            container={true}
            alignItems="stretch"
            direction="column"
            justify="flex-start"
        >
            {props.children}
        </Grid>
    </Paper>
);

export default PageViewComponent;
