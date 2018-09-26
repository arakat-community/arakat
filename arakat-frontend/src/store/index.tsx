import { RouterState } from "react-router-redux";
import { routerReducer } from "react-router-redux";
import {combineReducers, Reducer} from "redux";
import {reducer as reduxFormReducer} from "redux-form";
import appConfigReducer from "./app/reducer";
import { IApplicationConfigState } from "./app/types";
import authenticationReducer from "./authentication/reducer";
import { IAuthenticationState } from "./authentication/types";
import loadingProgressReducer from "./loading-progress/reducer";
import { ILoadingProgressState } from "./loading-progress/types";
import localizationReducer from "./localization/reducer";
import { ILocalizationState } from "./localization/types";
import userRoleManagementReducer from "./role-management/reducer";
import { IUserRoleManagementState } from "./role-management/types";
import snackbarReducer from "./snackbar/reducer";
import { ISnackbarMessagesState } from "./snackbar/types";
import userManagementReducer from "./user-management/reducer";
import { IUserManagementState } from "./user-management/types";

export interface IApplicationState {
    appConfig: IApplicationConfigState;
    authentication: IAuthenticationState;
    form: any;
    localization: ILocalizationState;
    request: ILoadingProgressState;
    routing: RouterState;
    snackbar: ISnackbarMessagesState;
    userManagement: IUserManagementState;
    userRoleManagement: IUserRoleManagementState;
}

export const reducers: Reducer<IApplicationState> = combineReducers<IApplicationState>({
    appConfig: appConfigReducer,
    authentication: authenticationReducer,
    form: reduxFormReducer,
    localization: localizationReducer,
    request: loadingProgressReducer,
    routing: routerReducer,
    snackbar: snackbarReducer,
    userManagement: userManagementReducer,
    userRoleManagement: userRoleManagementReducer,
});
