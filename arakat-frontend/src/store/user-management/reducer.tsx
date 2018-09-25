import {Reducer} from "redux";
import {IUserManagementState, UserManagementActions} from "./types";

export const initialState: IUserManagementState = {
    users: [],
};

const reducer: Reducer<IUserManagementState> =
(state: IUserManagementState = initialState, action: UserManagementActions) => {
    switch (action.type) {
        case "@@userManagement/BEGIN_FETCH_USERS":
            return {
                ...state,
                users: [],
            };
        case "@@userManagement/USERS_FETCHED":
            return {
                ...state,
                users: action.payload.users,
            };
        default:
            return state;
    }
};

export default reducer;
