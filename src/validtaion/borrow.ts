import z from "zod";
import {checkZodObjectId} from "@utils/helper.js";

const BorrowSchema = z.object({
    userId: checkZodObjectId("user"),
});

export type BorrowInput = z.infer<typeof BorrowSchema>;
export {BorrowSchema};