import type {BaseDBType} from "./common.js";

export interface BookDB extends BaseDBType {
    title: string;
    author: string;
    titleLower: string;
    authorLower: string;
    price?: number;
}