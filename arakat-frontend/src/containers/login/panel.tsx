import {get as getCookie, set as setCookie} from "es-cookie";
import React, { Component } from "react";
import {connect} from "react-redux";
import { Dispatch } from "redux";
import PanelComponent, { IAuthenticationForm } from "../../components/login/panel";
import { IApplicationState } from "../../store";
import { attemptLogin } from "../../store/authentication/actions";

interface IDispatchProps {
    login: (user: IAuthenticationForm) => void;
    handleRememberMe: (remember: boolean) => void;
}

interface IPanelProps {
    loading: boolean;
}

type AllProps = IDispatchProps & IPanelProps;

const Panel: React.SFC<AllProps> = (props: AllProps) => (
    <PanelComponent
        onSubmit={props.login}
        onRemembermeClicked={props.handleRememberMe}
        rememberMeChecked={getCookie("remember_me") === "true"}
        loading={props.loading}
    />
);

const mapStateToProps: (state: IApplicationState) => IPanelProps =
(state: IApplicationState): IPanelProps => ({loading: state.request && state.request.loading});

const mapDispatchToProps: (dispatch: Dispatch) => IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        handleRememberMe: (remember: boolean) => {
            setCookie("remember_me", remember.toString());
        },
        login: (user) => {
            dispatch(attemptLogin(user));
        },
    };
};

export default connect<IPanelProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(Panel);
