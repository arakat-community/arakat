import { Reducer } from "redux";
import { AuthenticationActions, IAuthenticationState } from "./types";

export const initialState: IAuthenticationState = {
    user: null,
};

const reducer: Reducer<IAuthenticationState, AuthenticationActions> = (state: IAuthenticationState = initialState, action: AuthenticationActions) => {
    switch (action.type) {
        case "@@authentication/LOGIN_ATTEMPT":
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
            return {
                user: null,
                ...state,
            };
        case "@@authentication/LOGOUT":
            return {
                user: null,
                ...state,
            };
        default:
            return state;
    }
};

export default reducer;
