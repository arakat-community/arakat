import axios, {AxiosPromise, AxiosResponse} from "axios";
import { IAuthenticationToken } from "../../../common/models/authentication/token";
import { IUser } from "../../../common/models/authentication/user";
import { IAuthenticationForm } from "../../../components/login/panel";
import Api from "../../../config/api";
import Request from "../../request";

export const authenticate: (user: IAuthenticationForm) => AxiosPromise<IAuthenticationToken>
= (user: IAuthenticationForm) => {
    const formData: FormData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("grant_type", "password");

    return new Request<IAuthenticationToken>(Api.Authentication, "/oauth/token").post<FormData>(formData);
};

export const getUser: () => AxiosPromise<IUser> = () => new Request<IUser>(Api.Authentication, "/Auth/User/me").get();

export const logout: (user: IUser) => AxiosPromise<void>
= (user: IUser) => new Request<void>(Api.Authentication, "/logout").get();
