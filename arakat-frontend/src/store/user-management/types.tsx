import {Action} from "redux";
import { IUser } from "../../common/models/authentication/user";

export interface IUserManagementState {
    users: Array<IUser>;
}

export interface IFetchUsers extends Action {
    type: "@@userManagement/BEGIN_FETCH_USERS";
    payload:{
        filter: IUser
    };
}

export interface IUsersFetched extends Action {
    type: "@@userManagement/USERS_FETCHED";
    payload:{
        users: Array<IUser>
    };
}

export interface IUsersFetchFailed extends Action {
    type: "@@userManagement/USERS_FETCH_FAILED";
}

export interface IUserSave extends Action {
    type: "@@userManagement/BEGIN_SAVE_USER";
    payload:{
        user: IUser
    };
}

export interface IUserSaved extends Action {
    type: "@@userManagement/USER_SAVED";
    payload:{
        user: IUser
    };
}

export interface IUserSaveFailed extends Action {
    type: "@@userManagement/USER_SAVE_FAILED";
}

export interface IUserUpdate extends Action {
    type: "@@userManagement/BEGIN_UPDATE_USER";
    payload:{
        user: IUser
    };
}

export interface IUserUpdated extends Action {
    type: "@@userManagement/USER_UPDATED";
    payload:{
        user: IUser
    };
}

export interface IUserUpdateFailed extends Action {
    type: "@@userManagement/USER_UPDATE_FAILED";
}

export interface IUserRemove extends Action {
    type: "@@userManagement/BEGIN_REMOVE_USER";
    payload:{
        userId: number
    };
}

export interface IUserRemoved extends Action {
    type: "@@userManagement/USER_REMOVED";
    payload:{
        userId: number
    };
}

export interface IUserRemoveFailed extends Action {
    type: "@@userManagement/USER_REMOVE_FAILED";
}

export type UserManagementActions = IFetchUsers | IUsersFetched | IUserSave | IUserSaved | IUserSaveFailed | IUsersFetchFailed
| IUserRemove | IUserRemoved | IUserRemoveFailed | IUserUpdate | IUserUpdated | IUserUpdateFailed;