import {Action} from "redux";
import { IUser } from "../../common/models/authentication/user";


export interface IAuthenticationState {
    user: IUser;
}

export interface ILoginAttempt extends Action {
    type: "@@authentication/LOGIN_ATTEMPT";
    payload:{
        user: any
    };
}

export interface ILoginSuccess extends Action {
    type: "@@authentication/LOGIN_SUCCESS";
    payload:{
        user: IUser;
    };
}

export interface ILoginFailed extends Action {
    type: "@@authentication/LOGIN_FAILED";
}

export interface ILogout extends Action {
    type: "@@authentication/LOGOUT";
}

export type AuthenticationActions = ILoginAttempt | ILoginSuccess | ILoginFailed | ILogout;