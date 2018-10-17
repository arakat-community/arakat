import React from "react";
import AppBarComponent, { IAppBarProps } from "../../components/appbar";

const AppBar: (props: IAppBarProps) => JSX.Element = (props: IAppBarProps) => ( <AppBarComponent {...props}/>);

export default AppBar;
