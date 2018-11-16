import React, { Component } from "react"; // why we need to import React?
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { INodeOffset } from "../../common/models/cyto-elements/node-offset";
// import { INodeSpec } from "../../common/models/node-specs";
import CytoGraph from "../../components/cyto";
import { IApplicationState } from "../../store/";
import {
    addNodeToExistingNodes,
    fetchNodeSpecs,
    increaseCVNodesLength,
    increasePipelineNodesLength,
    increaseTaskNodesLength,
    setIsNodeParametersDialogOpen,
    setLastDroppedNodeOffset,
    setSelectedNode,
    fetchEdgePermissions,
    addEdgeToGraphEdges,
    setGraph,
    setGraphProperties,
    saveGraph
} from "../../store/cyto/actions";
import { ICytoState } from "../../store/cyto/types";

interface ICytoContainerState {
    cytoState: ICytoState;
}


interface IDispatchProps {
    addNodeToExistingNodes: (nodeSpec) => void;
    fetchNodeSpecs: () => void;
    increaseCVNodesLength: () => void;
    increasePipelineNodesLength: () => void;
    increaseTaskNodesLength: () => void;
    setLastDroppedNodeOffset: (offset: INodeOffset) => void;
    setSelectedNode: (node) => void;
    setIsNodeParametersDialogOpen: (isDialogOpen: boolean) => void;
    fetchEdgePermissions: () => void;
    addEdgeToGraphEdges: (key: string, edge: any) => void;
    setGraph: (graph: any) => void;
    saveGraph: (graph: any) => void;
    setGraphProperties: (graphProperties: any) => void;
}

const mapStateToProps = (state: IApplicationState): ICytoContainerState => {
    return {
        cytoState: state.cyto,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        addNodeToExistingNodes: (nodeSpec: any) => {
            dispatch(addNodeToExistingNodes(nodeSpec));
        },
        fetchNodeSpecs: () => {
            dispatch(fetchNodeSpecs());
        },
        increaseCVNodesLength: () => {
            dispatch(increaseCVNodesLength());
        },
        increasePipelineNodesLength: () => {
            dispatch(increasePipelineNodesLength());
        },
        increaseTaskNodesLength: () => {
            dispatch(increaseTaskNodesLength());
        },
        setLastDroppedNodeOffset: (offset: INodeOffset) => {
            dispatch(setLastDroppedNodeOffset(offset));
        },
        setSelectedNode: (node: any) => {
            dispatch(setSelectedNode(node));
        },
        setIsNodeParametersDialogOpen: (isDialogOpen: boolean) => {
            dispatch(setIsNodeParametersDialogOpen(isDialogOpen));
        },
        fetchEdgePermissions: () => {
            dispatch(fetchEdgePermissions());
        },
        addEdgeToGraphEdges: (key: string, edge: any) => {
            dispatch(addEdgeToGraphEdges(key, edge));
        },
        setGraph: (graph: any) => {
            dispatch(setGraph(graph));
        },
        setGraphProperties: (graphProperties: any) => {
            dispatch(setGraphProperties(graphProperties));
        },
        saveGraph: (graph: any) => {
            dispatch(saveGraph(graph));
        }
    };
};

type AllProps = ICytoContainerState & IDispatchProps;

/**
 * class
 */
class CytoContainer extends Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
    }
    public componentDidMount() {
        this.props.fetchNodeSpecs();
        this.props.fetchEdgePermissions();
    }

    /**
     * render
     */
    public render(): JSX.Element {
        const { } = this.props;

        return (
          <CytoGraph
            {...this.props}
          />
        );
      }

}

export default connect<ICytoContainerState, IDispatchProps>(mapStateToProps, mapDispatchToProps)(CytoContainer);
