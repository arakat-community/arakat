import { IRouteItem } from "./item";
import { ICollapsibleRoute } from "./collapsible";

export interface IRouteGroup {
    name: JSX.Element;
    routes: Array<IRouteItem|ICollapsibleRoute>;
}