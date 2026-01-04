import type {BaseDBType} from "./common.js";
import type {CommentDB} from "@src/types/index.js";

export interface BookDB extends BaseDBType {
    title: string;
    author: string;
    titleLower: string;
    authorLower: string;
    price?: number;
    isAvailable: boolean;
    comments: CommentDB[];
}