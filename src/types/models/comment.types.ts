import type {BaseDBType} from "./common.js";
import {Types} from "mongoose";

export interface CommentDB extends BaseDBType {
    body: string;
    book: Types.ObjectId;
}