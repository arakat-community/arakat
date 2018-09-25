import {Action} from "redux";
import { IUserRole } from "../../common/models/authentication/user-role";

export interface IUserRoleManagementState {
    userRoles: Array<IUserRole>;
}

export interface IFetchUserRoles extends Action {
    type: "@@userRoleManagement/BEGIN_FETCH_USER_ROLES";
    payload:{
        filter: IUserRole
    };
}

export interface IUserRolesFetched extends Action {
    type: "@@userRoleManagement/USER_ROLES_FETCHED";
    payload:{
        userRoles: Array<IUserRole>
    };
}

export interface IUserRolesFetchFailed extends Action {
    type: "@@userRoleManagement/USER_ROLES_FETCH_FAILED";
}

export interface IUserRoleSave extends Action {
    type: "@@userRoleManagement/BEGIN_SAVE_USER_ROLE";
    payload:{
        userRole: IUserRole
    };
}

export interface IUserRoleSaved extends Action {
    type: "@@userRoleManagement/USER_ROLES_SAVED";
    payload:{
        userRole: IUserRole
    };
}

export interface IUserRoleSaveFailed extends Action {
    type: "@@userRoleManagement/USER_ROLES_SAVE_FAILED";
}

export interface IUserRoleUpdate extends Action {
    type: "@@userRoleManagement/BEGIN_UPDATE_USER_ROLE";
    payload:{
        userRole: IUserRole
    };
}

export interface IUserRoleUpdated extends Action {
    type: "@@userRoleManagement/USER_ROLES_UPDATED";
    payload:{
        userRole: IUserRole
    };
}

export interface IUserRoleUpdateFailed extends Action {
    type: "@@userRoleManagement/USER_ROLES_UPDATE_FAILED";
}

export interface IUserRoleRemove extends Action {
    type: "@@userRoleManagement/BEGIN_REMOVE_USER_ROLE";
    payload:{
        userRoleId: number
    };
}

export interface IUserRoleRemoved extends Action {
    type: "@@userRoleManagement/USER_ROLES_REMOVED";
    payload:{
        userRoleId: number
    };
}

export interface IUserRoleRemoveFailed extends Action {
    type: "@@userRoleManagement/USER_ROLES_REMOVE_FAILED";
}

export type UserRoleManagementActions = IFetchUserRoles | IUserRolesFetched | IUserRoleSave | IUserRoleSaved | IUserRoleSaveFailed
| IUserRolesFetchFailed | IUserRoleRemove | IUserRoleRemoved | IUserRoleRemoveFailed | IUserRoleUpdate | IUserRoleUpdated
| IUserRoleUpdateFailed;