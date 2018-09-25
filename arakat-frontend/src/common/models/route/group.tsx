import { ICollapsibleRoute } from "./collapsible";
import { IRouteItem } from "./item";
import { ComponentType } from "react";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

export interface IRouteGroup {
    name: JSX.Element;
    icon: ComponentType<SvgIconProps>;
    routes: Array<IRouteItem|ICollapsibleRoute>;
}
