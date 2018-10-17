import React from "react";
import SplitPaneComponent, { ISplitPaneProps } from "../../components/split-pane";

const SplitPaneContainer: (props: ISplitPaneProps) => JSX.Element = (props: ISplitPaneProps) => ( <SplitPaneComponent {...props}/>);

export default SplitPaneContainer;
