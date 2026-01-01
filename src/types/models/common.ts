import {Types} from "mongoose";

export interface BaseDBType {
    _id: Types.ObjectId;
    __v: string;
    createdAt: Date;
    updatedAt: Date;
}