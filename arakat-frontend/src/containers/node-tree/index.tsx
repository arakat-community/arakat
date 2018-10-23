import React from "react";
import { connect } from "react-redux";
import { INodeTree } from "../../common/models/node-tree";
import hocWithDragAndDrop from "../../components/hoc-with-drag-and-drop";
import NodeTreeComponent from "../../components/node-tree";
import { INodeTreeProps } from "../../components/node-tree";
import { IApplicationState } from "../../store/";

interface INodeTreeContainerProps {
    nodeTree: INodeTree;
}

const mapStateToProps: (state: IApplicationState) => INodeTreeContainerProps = (state: IApplicationState): INodeTreeContainerProps =>
({nodeTree: state.drawer.nodeTree});

type AllProps = INodeTreeContainerProps & INodeTreeProps;
const NodeTreeContainer: (props: AllProps) => JSX.Element = (props: AllProps) => (
    <NodeTreeComponent {...props} />
);

export default connect<INodeTreeContainerProps> (mapStateToProps)(hocWithDragAndDrop(NodeTreeContainer));
