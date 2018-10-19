import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import DrawerComponent, { IDrawerProps } from "../../components/drawer";
import { IApplicationState } from "../../store/";
import { IDrawerState } from "../../store/drawer/types";

interface IDrawerContainerProps {
    drawerState: IDrawerState;
}

const mapStateToProps: (state: IApplicationState) => IDrawerContainerProps = (state: IApplicationState): IDrawerContainerProps =>
({drawerState: state.drawer});

type AllProps = IDrawerProps & IDrawerContainerProps;
const DrawerContainer: (props: AllProps) => JSX.Element = (props: AllProps) => ( <DrawerComponent {...props}/>);

export default connect<IDrawerContainerProps>(mapStateToProps)(DrawerContainer);
