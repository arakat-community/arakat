import { Button, Grid, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import CytoGraph from "../../components/cyto/cyto";
import { layout } from "../../components/cyto/layout";
import AppBar from "../../containers/appbar";
import Content from "../../containers/content";
import Drawer from "../../containers/drawer/index";
import Layout from "../../containers/layout";
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
      <Layout>
            <Grid container>
            <AppBar
                routes = { dashboardRoutes }
                logoUrl = { "/assets/images/logo.png" }
                onLogoClick = { () => alert("dsd")}
                title = {"ARAKAT"}
            >
                <button>execute</button>
            </AppBar>

           <Drawer title="dsd" onLogoClick={this.Increment}></Drawer>

          {this.state.b}
 </Grid>
</Layout>
    );

  }
}
export default TestView;
