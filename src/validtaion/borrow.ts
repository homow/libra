import {z} from "zod";
import {Types} from "mongoose";

const objectId = z.string().refine(
    (val) => Types.ObjectId.isValid(val),
    {message: "Invalid user id"}
);

const BorrowSchema = z.object({
    userId: objectId,
    returnedAt: z.date().optional(),
});

export {BorrowSchema};