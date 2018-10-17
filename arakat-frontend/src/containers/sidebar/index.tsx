import React from "react";
import SidebarComponent, { ISidebarProps } from "../../components/sidebar";

const Sidebar: (props: ISidebarProps) => JSX.Element = (props: ISidebarProps) => ( <SidebarComponent {...props}/>);

export default Sidebar;
