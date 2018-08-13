import {ActionCreator} from "redux";
import { IUser } from "../../common/models/authentication/user";
import {ILoginAttempt, ILoginFailed, ILoginSuccess, ILogout} from "./types";

export const attemptLogin: ActionCreator<ILoginAttempt> = (user: any) => ({
    payload: {
        user,
    },
    type: "@@authentication/LOGIN_ATTEMPT",
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
