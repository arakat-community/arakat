import React, { Component } from "react";
import { connect } from "react-redux";
import CytoGraph from "../../components/cyto/cyto";
import hocWithDragAndDrop from "../../components/hoc-with-drag-and-drop";
import Content from "../../containers/content";
import { routes as dashboardRoutes } from "../../routes/dashboard";

interface IState {
  open: boolean;
  b: JSX.Element;
}

/**
 * class test view
 */
class CytoView extends Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      b: <div />,
      open: false,
    };
  }

  /**
   * sa
   */
  public Increment = () => {
    this.setState({
      b: <Content routes={[...dashboardRoutes]} />,
    });
  }

  /**
   * render
   */
  public render() {
    return (
        <CytoGraph />
    );
  }
}
export default hocWithDragAndDrop(CytoView);

// export default CytoView;
