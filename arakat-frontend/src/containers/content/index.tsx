import React from "react";
import { connect } from "react-redux";
import ContentComponent, { IContentProps } from "../../components/content";
import { IApplicationState } from "../../store";

interface IContentContainerProps {
    isDrawerOpen: boolean;
}

type AllProps = IContentContainerProps & IContentProps;
const Content: (props: AllProps) => JSX.Element = (props: AllProps) => ( <ContentComponent {...props}/>);

const mapStateToProps: (state: IApplicationState) => IContentContainerProps = (state: IApplicationState): IContentContainerProps =>
({isDrawerOpen: state.drawer.isOpen});

export default connect<IContentContainerProps> (mapStateToProps)(Content);
