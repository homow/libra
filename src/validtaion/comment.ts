import z from "zod";
import {checkZodObjectId} from "@utils/helper.js";

const CommentSchema = z.object({
    body: z.string().min(1, "comment must 1 character"),
    bookId: checkZodObjectId("book")
});

export type InputComment = z.infer<typeof CommentSchema>;

export default CommentSchema;