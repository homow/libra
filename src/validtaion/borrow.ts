import z from "zod";
import {Types} from "mongoose";

const objectId = z.string().refine(
    (val) => Types.ObjectId.isValid(val),
    {message: "Invalid user id"}
);

const BorrowSchema = z.object({
    userId: objectId,
});

export type BorrowInput = z.infer<typeof BorrowSchema>;
export {BorrowSchema};