import type {BaseDBType} from "./common.js";

export interface UserDB extends BaseDBType {
    name?: string;
    email: string;
    age: number;
}