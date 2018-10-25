import React, { Component } from "react"; // why we need to import React?
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { INodeOffset } from "../../common/models/cyto-elements/node-offset";
import { INodeSpec } from "../../common/models/node-specs";
import CytoGraph from "../../components/cyto";
import { IApplicationState } from "../../store/";
import {
    addNodeToExistingNodes,
    fetchNodeSpecs,
    increaseCVNodesLength,
    increasePipelineNodesLength,
    increaseTaskNodesLength,
    setLastDroppedNodeOffset,
} from "../../store/cyto/actions";
import { ICytoState } from "../../store/cyto/types";

interface ICytoContainerState {
    cytoState: ICytoState;
}

interface IDispatchProps {
    addNodeToExistingNodes: (nodeSpec: INodeSpec) => void;
    fetchNodeSpecs: () => void;
    increaseCVNodesLength: () => void;
    increasePipelineNodesLength: () => void;
    increaseTaskNodesLength: () => void;
    setLastDroppedNodeOffset: (offset: INodeOffset) => void;
}

const mapStateToProps = (state: IApplicationState): ICytoContainerState => {
    return {
        cytoState: state.cyto,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        addNodeToExistingNodes: (nodeSpec: INodeSpec) => {
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
