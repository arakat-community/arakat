import {ActionCreator} from "redux";
import { IAuthenticationToken } from "../../common/models/authentication/token";
import { IUser } from "../../common/models/authentication/user";
import { IAuthenticationForm } from "../../components/login/panel";
import {IAuthTokenFetched, ILoginAttempt, ILoginFailed, ILoginSuccess, ILogout} from "./types";

export const attemptLogin: ActionCreator<ILoginAttempt> = (user: IAuthenticationForm) => ({
    payload: {
        user,
    },
    type: "@@authentication/LOGIN_ATTEMPT",
});

export const authTokenFetched: ActionCreator<IAuthTokenFetched> = (auth: IAuthenticationToken) => ({
    payload: {
      auth,
    },
    type: "@@authentication/AUTH_TOKEN_FETCHED",
});

export const loginSuccessed: ActionCreator<ILoginSuccess> = (user: IUser) => ({
    payload: {
      user,
    },
    type: "@@authentication/LOGIN_SUCCESS",
});

export const loginFailed: ActionCreator<ILoginFailed> = () => ({
    type: "@@authentication/LOGIN_FAILED",
});

export const logoutUser: ActionCreator<ILogout> = () => ({
    type: "@@authentication/LOGOUT",
});
