import React, { Component } from "react";
import hocWithDragAndDrop from "../../components/hoc-with-drag-and-drop";
import CytoContainer from "../../containers/cyto";

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
   * render
   */
  public render() {
    return (
        <CytoContainer />
    );
  }
}
export default hocWithDragAndDrop(CytoView);

// export default CytoView;
