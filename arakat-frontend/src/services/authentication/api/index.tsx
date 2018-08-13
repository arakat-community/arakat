import axios, {AxiosPromise, AxiosResponse} from "axios";
import { IUser } from "../../../common/models/authentication/user";
import Api from "../../../config/api";
import Request from "../../request";

export const authenticate: (user: any) => AxiosPromise<IUser>
= (user: any) => new Request<IUser>(Api.User, "/login").post<any>(user);

export const logout: (user: IUser) => AxiosPromise<void>
= (user: IUser) => new Request<void>(Api.User, "/logout").post<IUser>(user);
