import { Button, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import AppBar from "../../containers/appbar";
import Content from "../../containers/content";
import Drawer from "../../containers/drawer/index";
import { routes as dashboardRoutes } from "../../routes/dashboard";

interface IState {
  open: boolean;
  b: JSX.Element;
}

/**
 * class test view
 */
class TestView extends Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      b : <div></div>,
      open : false,

    };
  }

  /**
   * sa
   */
  public Increment = () => {
    this.setState({
         b : <Content routes={[...dashboardRoutes]}></Content>,
    });
}

  /**
   * render
   */
  public render() {
    return(
      <div>
        <div >
           <AppBar
                routes = { dashboardRoutes }
                logoUrl = { "/assets/images/logo.png" }
                onLogoClick = { () => alert("dsd")}
                title = {"ARAKAT"}
            >
                <button>execute</button>
            </AppBar>
            <Drawer title="dsd" onLogoClick={this.Increment}></Drawer>
        </div>
        <div>
          {this.state.b}
        </div>

      </div>
    );

  }
}

export default TestView;
