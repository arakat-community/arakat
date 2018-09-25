import {ActionCreator} from "redux";
import { IUser } from "../../common/models/authentication/user";
import {
    IFetchUsers,
    IUserRemove,
    IUserRemoved,
    IUserRemoveFailed,
    IUserSave,
    IUserSaved,
    IUserSaveFailed,
    IUsersFetched,
    IUsersFetchFailed,
    IUserUpdate,
    IUserUpdated,
    IUserUpdateFailed,
} from "./types";

export const fetchUsers: ActionCreator<IFetchUsers> = (filter: IUser) => ({
    payload: {
        filter,
    },
    type: "@@userManagement/BEGIN_FETCH_USERS",
});

export const usersFetched: ActionCreator<IUsersFetched> = (users: IUser[]) => ({
    payload: {
        users,
    },
    type: "@@userManagement/USERS_FETCHED",
});

export const usersFetchFailed: ActionCreator<IUsersFetchFailed> = () => ({
    type: "@@userManagement/USERS_FETCH_FAILED",
});

export const saveUser: ActionCreator<IUserSave> = (user: IUser) => ({
    payload: {
        user,
    },
    type: "@@userManagement/BEGIN_SAVE_USER",
});

export const userSaved: ActionCreator<IUserSaved> = (user: IUser) => ({
    payload: {
        user,
    },
    type: "@@userManagement/USER_SAVED",
});

export const userSaveFailed: ActionCreator<IUserSaveFailed> = (user: IUser) => ({
    type: "@@userManagement/USER_SAVE_FAILED",
});

export const updateUser: ActionCreator<IUserUpdate> = (user: IUser) => ({
    payload: {
        user,
    },
    type: "@@userManagement/BEGIN_UPDATE_USER",
});

export const userUpdated: ActionCreator<IUserUpdated> = (user: IUser) => ({
    payload: {
        user,
    },
    type: "@@userManagement/USER_UPDATED",
});

export const userUpdateFailed: ActionCreator<IUserUpdateFailed> = () => ({
    type: "@@userManagement/USER_UPDATE_FAILED",
});

export const removeUser: ActionCreator<IUserRemove> = (userId: number) => ({
    payload: {
        userId,
    },
    type: "@@userManagement/BEGIN_REMOVE_USER",
});

export const userRemoved: ActionCreator<IUserRemoved> = (userId: number) => ({
    payload: {
        userId,
    },
    type: "@@userManagement/USER_REMOVED",
});

export const userRemoveFailed: ActionCreator<IUserRemoveFailed> = () => ({
    type: "@@userManagement/USER_REMOVE_FAILED",
});
