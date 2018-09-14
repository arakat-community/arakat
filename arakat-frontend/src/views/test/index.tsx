import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import CytoGraph from "../../components/cyto/cyto";
import AppBar from "../../containers/appbar";
import { routes as dashboardRoutes } from "../../routes/dashboard";

/**
 * test view class
 */
class TestView extends Component<{}, {}> {
  constructor(props) {
    super(props);
  }
  /**
   * render the output
   */
  public render() {
    return (
      <>
        {/*<AppBar
          routes={dashboardRoutes}
          logoUrl={"/assets/images/logo.png"}
          onLogoClick={() => alert("sa")}
          title={"ARAKAT"}
        >
          <button>Run</button>
        </AppBar>*/}

        <CytoGraph />
      </>
    );
  }
}

export default TestView;
