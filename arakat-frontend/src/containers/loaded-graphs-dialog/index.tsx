import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../store";
import
{
    fetchGraphs,
    fetchGraph,
    setIsLoadedGraphsDialogOpen
} from "../../store/cyto/actions";
import LoadedGraphsDialogComponent from '../../components/loaded-graphs-dialog'; 

interface ILoadedGraphsDialogContainerState {
    isDialogOpen: boolean;
    loadedGraphs: any[];
}
interface IDispatchProps {
    fetchGraphs: () => void;
    fetchGraph: (graphId: string) => void;
    setIsLoadedGraphsDialogOpen: (isOpen: boolean) => void;
}

const mapStateToProps = (state: IApplicationState): ILoadedGraphsDialogContainerState => {
    return {
        isDialogOpen: state.cyto.isLoadedGraphsDialogOpen,
        loadedGraphs: state.cyto.loadedGraphs
    }
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        fetchGraphs: () => {
            dispatch(fetchGraphs());
        },
        fetchGraph: (graphId: string) => {
            dispatch(fetchGraph(graphId));
        },
        setIsLoadedGraphsDialogOpen: (isOpen: boolean) => {
            dispatch(setIsLoadedGraphsDialogOpen(isOpen));
        }
    };
};

type AllProps = ILoadedGraphsDialogContainerState & IDispatchProps;

const LoadedGraphsDialogContainer: (props: AllProps) => JSX.Element = (props: AllProps) => ( <LoadedGraphsDialogComponent {...props}/>);

export default connect<ILoadedGraphsDialogContainerState, IDispatchProps>(mapStateToProps, mapDispatchToProps)(LoadedGraphsDialogContainer);
