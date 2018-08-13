import { IRouteItem } from "./item";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { ComponentType } from "react";

export interface ICollapsibleRoute {
    collapsible: boolean;
    icon: ComponentType<SvgIconProps>;
    id: number;
    name:  JSX.Element;
    routes: Array<IRouteItem>;
}