import {Types} from "mongoose";
import type {BaseDBType} from "./common.js";

export interface BorrowDB extends BaseDBType {
    bookId: Types.ObjectId;
    userId: Types.ObjectId;
    borrowedAt: Date;
    returnedAt: Date | null;
    isReturned: Boolean;
}