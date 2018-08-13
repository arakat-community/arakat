import { Component, ComponentType, StatelessComponent } from "react";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { RouteComponentProps } from "react-router";

export interface IRouteItem {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    exact?:boolean;
    icon: ComponentType<SvgIconProps>;
    name: JSX.Element;
    path: string;
    title: JSX.Element;
}