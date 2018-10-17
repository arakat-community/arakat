import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { Component, ComponentType, StatelessComponent } from "react";
import { RouteComponentProps } from "react-router";

export interface IRouteItem {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    default: boolean;
    exact?: boolean;
    icon: ComponentType<SvgIconProps>;
    name: JSX.Element;
    path: string;
    title: JSX.Element;
}
