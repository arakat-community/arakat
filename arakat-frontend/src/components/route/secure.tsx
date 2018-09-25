import React, { Component } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import LoginView from "../../views/login/index";

export interface ISecureRouteProps {
  authenticated: boolean;
  children: any;
  loginPath: string;
}

type AllTypes = ISecureRouteProps;

/**
 * Secure routes
 */
class SecureRoute extends Component<AllTypes, {}> {
    /**
     * renders output
     */
    public render(): JSX.Element {
        const {authenticated, children, loginPath} = this.props;
        if (authenticated) {
            return children;
        } else {
            return <Redirect to={"/login"} />;
        }
    }
}

export default SecureRoute;
