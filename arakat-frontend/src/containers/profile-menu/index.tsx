import React from "react";
import ProfileMenuComponent, { IProfileMenuProps } from "../../components/profile";
import { 
    setIsGraphPropertiesDialogOpen, 
    saveGraph, 
    setIsAboutToSave, 
    setIsAboutToRun,
    setIsLoadedGraphsDialogOpen
}  from '../../store/cyto/actions';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../store";


interface IDispatchProps {
    setIsGraphPropertiesDialogOpen: (isOpen: boolean) => void;
    saveGraph: (graph: any) => void;
    setIsAboutToSave: (isAboutToSave: boolean) => void;
    setIsAboutToRun: (isAboutToRun: boolean) => void;    
    setIsLoadedGraphsDialogOpen: (isOpen: boolean) => void;
}

interface IProfileMenuState {
    graph: any;
    loadedGraphs: any[];
}

const mapDispatchToProps: (dispatch: Dispatch) =>  IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        setIsGraphPropertiesDialogOpen: (isOpen: boolean) => {
            dispatch(setIsGraphPropertiesDialogOpen(isOpen));
        },
        saveGraph: (graph: any) => {
            dispatch(saveGraph(graph));
        },
        setIsAboutToSave: (isAboutToSave: boolean) => {
            dispatch(setIsAboutToSave(isAboutToSave));
        },
        setIsAboutToRun: (isAboutToRun: boolean) => {
            dispatch(setIsAboutToRun(isAboutToRun))
        },
        setIsLoadedGraphsDialogOpen: (isOpen: boolean) => {
            dispatch(setIsLoadedGraphsDialogOpen(isOpen));
        } 
    };
};

const mapStateToProps: (state: IApplicationState) => IProfileMenuState = (state: IApplicationState): IProfileMenuState =>
({
    graph: state.cyto.graph,
    loadedGraphs: state.cyto.loadedGraphs
});

type AllProps = IDispatchProps & IProfileMenuProps;

const ProfileMenu: (props: AllProps) => JSX.Element = (props: AllProps) => ( <ProfileMenuComponent {...props}/>);

export default connect<IProfileMenuState, IDispatchProps>(mapStateToProps, mapDispatchToProps)(ProfileMenu);
