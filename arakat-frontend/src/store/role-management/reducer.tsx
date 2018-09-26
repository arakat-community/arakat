import {Reducer} from "redux";
import {IUserRoleManagementState, UserRoleManagementActions} from "./types";

export const initialState: IUserRoleManagementState = {
    userRoles: [],
};

const reducer: Reducer<IUserRoleManagementState> =
(state: IUserRoleManagementState = initialState, action: UserRoleManagementActions) => {
    switch (action.type) {
        case "@@userRoleManagement/BEGIN_FETCH_USER_ROLES":
            return {
                ...state,
                userRoles: [],
            };
        case "@@userRoleManagement/USER_ROLES_FETCHED":
            return {
                ...state,
                userRoles: action.payload.userRoles,
            };
        default:
            return state;
    }
};

export default reducer;
