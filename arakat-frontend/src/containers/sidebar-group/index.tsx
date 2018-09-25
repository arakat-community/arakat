import React from "react";
import SidebarGroupComponent, { ISidebarGroupProp } from "../../components/sidebar-group";

const SidebarGroupContainer: (props: ISidebarGroupProp) => JSX.Element = (props: ISidebarGroupProp) =>
(<SidebarGroupComponent {...props}/>);

export default SidebarGroupContainer;
