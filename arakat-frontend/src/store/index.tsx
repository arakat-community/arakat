import { RouterState } from "react-router-redux";
import { routerReducer } from "react-router-redux";
import {combineReducers, Dispatch, Reducer} from "redux";
import {FormState, reducer as reduxFormReducer} from "redux-form";
import authenticationReducer from "./authentication/reducer";
import { IAuthenticationState } from "./authentication/types";
import localizationReducer from "./localization/reducer";
import { ILocalizationState } from "./localization/types";
import snackbarReducer from "./snackbar/reducer";
import { ISnackbarMessagesState } from "./snackbar/types";

export interface IApplicationState {
    authentication: IAuthenticationState;
    form: any;
    localization: ILocalizationState;
    routing: RouterState;
    snackbar: ISnackbarMessagesState;
}

export const reducers: Reducer<IApplicationState> = combineReducers<IApplicationState>({
    authentication: authenticationReducer,
    form: reduxFormReducer,
    localization: localizationReducer,
    routing: routerReducer,
    snackbar: snackbarReducer,
});
