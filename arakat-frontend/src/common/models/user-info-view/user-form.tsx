import { IUser } from "../authentication/user";

export interface IUserInfoViewForm extends IUser {
    repassword: string;
}