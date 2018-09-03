import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import AppBar from "../../containers/appbar";
import { routes as dashboardRoutes } from "../../routes/dashboard";

const TestView: React.SFC = () => (
    <div>
            <AppBar
                routes = { dashboardRoutes }
                logoUrl = { "/assets/images/logo.png" }
                onLogoClick = { () => alert("sa")}
                title = {"ARAKAT"}
            >
                <button>SA</button>
            </AppBar>
            <Typography variant="title"><FormattedMessage id="example.hello.world" /></Typography>
    </div>

);

export default TestView;
