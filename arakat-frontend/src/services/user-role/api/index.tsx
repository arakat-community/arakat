import { AxiosPromise } from "axios";
import { IUserRole } from "../../../common/models/authentication/user-role";
import Api from "../../../config/api";
import Request from "../../request";

/**
 * fetch all user roles
 */
export const fetchUserRoles: (filter: IUserRole) => AxiosPromise<IUserRole[]> = (filter: IUserRole) =>
    new Request<IUserRole[]>(Api.Authentication, "/Auth/UserRole/all").get();

/**
 * updates user role
 * @param userRole user role object to update
 */
export const updateUserRole: (userRole: IUserRole) => AxiosPromise<IUserRole> = (userRole: IUserRole) =>
new Request<IUserRole>(Api.Authentication, `/Auth/UserRole/${userRole.id}`).put(userRole);

/**
 * remove user
 */
export const removeUserRole: (userRoleId: number) => AxiosPromise<void> = (userRoleId: number) =>
new Request<void>(Api.Authentication, "/Auth/UserRole/").delete(userRoleId);

/**
 * save user object
 * @param user user object to save
 */
export const saveUserRole: (userRole: IUserRole) => AxiosPromise<IUserRole> = (userRole: IUserRole) =>
new Request<IUserRole>(Api.Authentication, "/Auth/UserRole").post(userRole);
