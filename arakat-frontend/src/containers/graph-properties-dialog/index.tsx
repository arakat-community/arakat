import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../store";
import
{
    setGraphProperties,
    setIsGraphPropertiesDialogOpen
} from "../../store/cyto/actions";
import GraphPropertiesDialogComponent from '../../components/graph-properties-dialog'; 

interface IGraphPropertiesDialogContainerState {
    isOpen: boolean;
}
interface IDispatchProps {
    setGraphProperties: (graphProperties: any) => void;
    setIsGraphPropertiesDialogOpen: (isOpen: boolean) => void;
}

const mapStateToProps = (state: IApplicationState): IGraphPropertiesDialogContainerState => {
    return {
        isOpen: state.cyto.isGraphPropertiesDialogOpen,
    }
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        setGraphProperties: (graphProperties: any) => {
            dispatch(setGraphProperties(graphProperties));
        },
        setIsGraphPropertiesDialogOpen: (isOpen: boolean) => {
            dispatch(setIsGraphPropertiesDialogOpen(isOpen));
        }
    };
};

type AllProps = IGraphPropertiesDialogContainerState & IDispatchProps;

const GraphPropertiesDialogContainer: (props: AllProps) => JSX.Element = (props: AllProps) => ( <GraphPropertiesDialogComponent {...props}/>);

export default connect<IGraphPropertiesDialogContainerState, IDispatchProps>(mapStateToProps, mapDispatchToProps)(GraphPropertiesDialogContainer);
