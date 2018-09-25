import { ActionCreator } from "redux";
import { IUserRole } from "../../common/models/authentication/user-role";
import {
    IFetchUserRoles,
    IUserRoleRemove,
    IUserRoleRemoved,
    IUserRoleRemoveFailed,
    IUserRoleSave,
    IUserRoleSaved,
    IUserRoleSaveFailed,
    IUserRolesFetched,
    IUserRolesFetchFailed,
    IUserRoleUpdate,
    IUserRoleUpdated,
    IUserRoleUpdateFailed,
} from "./types";

export const fetchUserRoles: ActionCreator<IFetchUserRoles> = (filter: IUserRole) => ({
    payload: {
        filter,
    },
    type: "@@userRoleManagement/BEGIN_FETCH_USER_ROLES",
});

export const userRolesFetched: ActionCreator<IUserRolesFetched> = (userRoles: IUserRole[]) => ({
    payload: {
        userRoles,
    },
    type: "@@userRoleManagement/USER_ROLES_FETCHED",
});

export const userRolesFetchFailed: ActionCreator<IUserRolesFetchFailed> = () => ({
    type: "@@userRoleManagement/USER_ROLES_FETCH_FAILED",
});

export const saveUserRole: ActionCreator<IUserRoleSave> = (userRole: IUserRole) => ({
    payload: {
        userRole,
    },
    type: "@@userRoleManagement/BEGIN_SAVE_USER_ROLE",
});

export const userRoleSaved: ActionCreator<IUserRoleSaved> = (userRole: IUserRole) => ({
    payload: {
        userRole,
    },
    type: "@@userRoleManagement/USER_ROLES_SAVED",
});

export const userRoleSaveFailed: ActionCreator<IUserRoleSaveFailed> = (userRole: IUserRole) => ({
    type: "@@userRoleManagement/USER_ROLES_SAVE_FAILED",
});

export const updateUserRole: ActionCreator<IUserRoleUpdate> = (userRole: IUserRole) => ({
    payload: {
        userRole,
    },
    type: "@@userRoleManagement/BEGIN_UPDATE_USER_ROLE",
});

export const userRoleUpdated: ActionCreator<IUserRoleUpdated> = (userRole: IUserRole) => ({
    payload: {
        userRole,
    },
    type: "@@userRoleManagement/USER_ROLES_UPDATED",
});

export const userRoleUpdateFailed: ActionCreator<IUserRoleUpdateFailed> = () => ({
    type: "@@userRoleManagement/USER_ROLES_UPDATE_FAILED",
});

export const removeUserRole: ActionCreator<IUserRoleRemove> = (userRoleId: number) => ({
    payload: {
        userRoleId,
    },
    type: "@@userRoleManagement/BEGIN_REMOVE_USER_ROLE",
});

export const userRoleRemoved: ActionCreator<IUserRoleRemoved> = (userRoleId: number) => ({
    payload: {
        userRoleId,
    },
    type: "@@userRoleManagement/USER_ROLES_REMOVED",
});

export const userRoleRemoveFailed: ActionCreator<IUserRoleRemoveFailed> = () => ({
    type: "@@userRoleManagement/USER_ROLES_REMOVE_FAILED",
});
