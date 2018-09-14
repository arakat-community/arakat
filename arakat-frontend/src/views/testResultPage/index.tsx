import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import ResultTable from "../../containers/result-table";
import { routes as dashboardRoutes } from "../../routes/dashboard";

/*
const TestResultPage: React.SFC = () => (
    <Typography variant="title">This is your Result Page!</Typography>
);
*/

/**
 * Test Result Page
 */
class TestResultPage extends Component<{}, {}> {

    constructor(props) {
        super(props);
    }
    /**
     * render the output
     */
    public render() {
        return (
            <>
                <ResultTable>
                </ResultTable>
            </>
        );
    }

}

export default TestResultPage;
