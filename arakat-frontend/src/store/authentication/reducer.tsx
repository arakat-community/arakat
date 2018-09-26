import {remove as removeCookie, set as setCookie} from "es-cookie";
import {Reducer} from "redux";
import {AuthenticationActions, IAuthenticationState} from "./types";

export const initialState: IAuthenticationState = {
    auth: null,
    user: null,
};

const setToken: (access_token: string) => void = (access_token) => {
    setCookie("access_token", access_token);
};

const reducer: Reducer<IAuthenticationState> = (state: IAuthenticationState = initialState, action: AuthenticationActions) => {
    switch (action.type) {
        case "@@authentication/AUTH_TOKEN_FETCHED":
            setToken(action.payload.auth.access_token);
            return {
                ...state,
                user: null,
            };
        case "@@authentication/LOGIN_ATTEMPT":
            removeCookie("access_token");
            return {
                ...state,
                user: null,
            };
        case "@@authentication/LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload.user,
            };
        case "@@authentication/LOGIN_FAILED":
            removeCookie("access_token");
            return {
                ...state,
                user: null,
            };
        case "@@authentication/LOGOUT":
            removeCookie("access_token");
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default reducer;
