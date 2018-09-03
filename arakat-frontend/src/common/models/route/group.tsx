import { IRouteItem } from "./item";
import { ICollapsibleRoute } from "./collapsible";
import { ComponentType } from "react"
import { SvgIconProps } from "@material-ui/core/SvgIcon";

export interface IRouteGroup {
    name: JSX.Element;
    routes: Array<IRouteItem|ICollapsibleRoute>;
}