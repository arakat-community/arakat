import {Action} from "redux";
import { IAuthenticationToken } from "../../common/models/authentication/token";
import { IUser } from "../../common/models/authentication/user";
import { IAuthenticationForm } from "../../components/login/panel";

export interface IAuthenticationState {
    auth: IAuthenticationToken;
    user: IUser;
}

export interface ILoginAttempt extends Action {
    type: "@@authentication/LOGIN_ATTEMPT";
    payload: {
        user: IAuthenticationForm,
    };
}

export interface IAuthTokenFetched extends Action {
    type: "@@authentication/AUTH_TOKEN_FETCHED";
    payload: {
        auth: IAuthenticationToken;
    };
}

export interface ILoginSuccess extends Action {
    type: "@@authentication/LOGIN_SUCCESS";
    payload: {
        user: IUser;
    };
}

export interface ILoginFailed extends Action {
    type: "@@authentication/LOGIN_FAILED";
}

export interface ILogout extends Action {
    type: "@@authentication/LOGOUT";
}

export type AuthenticationActions = ILoginAttempt | ILoginSuccess | ILoginFailed | ILogout | IAuthTokenFetched;
