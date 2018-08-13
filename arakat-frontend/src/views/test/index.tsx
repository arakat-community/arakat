import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";

const TestView: React.SFC = () => (
    <Typography variant="title"><FormattedMessage id="example.hello.world" /></Typography>
);

export default TestView;
