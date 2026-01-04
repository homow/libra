import z from "zod";
import {Types} from "mongoose";

export function checkZodObjectId(
    message: string = ""
) {
    return z.string().refine(
        (value) => Types.ObjectId.isValid(value),
        {message: `Invalid ${message} id`}
    );
}