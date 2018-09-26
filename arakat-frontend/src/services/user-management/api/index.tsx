import { AxiosPromise } from "axios";
import { IUser } from "../../../common/models/authentication/user";
import Api from "../../../config/api";
import Request from "../../request";

/**
 * fetch all users
 */
export const fetchUsers: () => AxiosPromise<IUser[]> = () => new Request<IUser[]>(Api.Authentication, "/Auth/User/all").get();

/**
 * updates user
 * @param user user object to update
 */
export const updateUser: (user: IUser) => AxiosPromise<IUser> = (user: IUser) => new Request<IUser>(Api.Authentication,
                                                                                                    `/Auth/User/${user.id}`).put(user);

/**
 * remove user
 */
export const removeUser: (userId: number) => AxiosPromise<void> = (userId: number) =>
new Request<void>(Api.Authentication, "/Auth/User/").delete(userId);

/**
 * save user object
 * @param user user object to save
 */
export const saveUser: (user: IUser) => AxiosPromise<IUser> = (user: IUser) =>
new Request<IUser>(Api.Authentication, "/Auth/User").post(user);
