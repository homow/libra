import {Types} from "mongoose";

export interface BaseDBType {
    _id?: Types.ObjectId;
    __v?: number;
    createdAt: Date | string;
    updatedAt: Date | string;
}