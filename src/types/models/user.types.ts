import type {BaseDBType} from "./common.js";

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
}

export interface UserDB extends BaseDBType {
    name?: string;
    email: string;
    age: number;
    role: UserRole;
}