import type {CommentDB} from "@src/types/index.js";
import mongoose, {type Model, type Schema, Types} from "mongoose";

export const CommentModelSchema: Schema<CommentDB> = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
            minLength: 1,
        },
        book: {
            type: Types.ObjectId,
            required: true,
            ref: "Book",
        }
    }, {timestamps: true}
);

const CommentModel: Model<CommentDB> =
    mongoose.models.Comment
    || mongoose.model<CommentDB>("Comment", CommentModelSchema);

export default CommentModel;