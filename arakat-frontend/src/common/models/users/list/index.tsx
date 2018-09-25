import { IUserRole } from "../../authentication/user-role";

export interface IUserList {
    id: number;
    username: string;
    password: string;
    email: string;
    enabled: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    name: string;
    surname: string;
    citizenshipNumber: string;
    userRoles: Array<IUserRole>;
}