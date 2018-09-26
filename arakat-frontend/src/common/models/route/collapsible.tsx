import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { ComponentType } from "react";
import { IRouteItem } from "./item";

export interface ICollapsibleRoute {
    collapsible: boolean;
    icon: ComponentType<SvgIconProps>;
    id: number;
    name: JSX.Element;
    routes: IRouteItem;
}
