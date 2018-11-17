import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
// import { INodeSpec } from "../../common/models/node-specs";
import NodeParametersDialogComponent, { INodeParametersProps } from "../../components/node-parameters-dialog";
import { IApplicationState } from "../../store/";
import
{
    addNodeToDagNodes,
    setIsNodeParametersDialogOpen,
    updateDagNode,
} from "../../store/cyto/actions";

interface INodeParametersContainerState {
    selectedNode: any;
    isDialogOpen: boolean;
}


interface IDispatchProps {
    setIsNodeParametersDialogOpen: (isDialogOpen: boolean) => void;
    addNodeToDagNodes: (node: any) => void;
    updateDagNode: (node: any) => void;
}

const mapStateToProps: (state: IApplicationState) => INodeParametersContainerState =
                       (state: IApplicationState): INodeParametersContainerState =>
({
    selectedNode: state.cyto.selectedNode,
    isDialogOpen: state.cyto.isDialogOpen,
});



const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        setIsNodeParametersDialogOpen: (isDialogOpen: boolean) => {
            dispatch(setIsNodeParametersDialogOpen(isDialogOpen));
        },
        addNodeToDagNodes: (node: any) => {
            dispatch(addNodeToDagNodes(node));
        },
        updateDagNode: (node: any) => {
            dispatch(updateDagNode(node));
        },
    };
};

type AllProps = INodeParametersProps & INodeParametersContainerState;

const NodeParametersDialogContainer: (props: AllProps) => JSX.Element = (props: AllProps) => ( <NodeParametersDialogComponent {...props}/>);

export default connect<INodeParametersContainerState, IDispatchProps>(mapStateToProps, mapDispatchToProps)(NodeParametersDialogContainer);
