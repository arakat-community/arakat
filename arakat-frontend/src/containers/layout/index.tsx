import React from "react";
import { RouteComponentProps } from "react-router";
import { IAppState } from "../../app";
import LayoutComponent, { ILayoutProps } from "../../components/layout";

const Layout: (props: ILayoutProps) => JSX.Element = (props:
    any) => ( <LayoutComponent {...props}/>);

export default Layout;
