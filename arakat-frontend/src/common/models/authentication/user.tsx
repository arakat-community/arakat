import { IUserRole } from "./user-role";

export interface IUser {
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    citizenshipNumber: string;
    email: string;
    enabled: boolean;
    ldapUserId: number;
    locale: string;
    id: number;
    name: string;
    password: string;
    passwordEncrypted: boolean;
    surname: string;
    username: string;
    userRoles: IUserRole[];
}
