import type {BookDB} from "@src/types/index.js";
import mongoose, {Schema, type Model} from "mongoose";

const BookModelSchema: Schema<BookDB> = new Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true,
        },
        price: {
            type: Number,
            min: 0,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

BookModelSchema.index(
    {title: 1, author: 1},
    {unique: true}
);

const BookModel: Model<BookDB> =
    mongoose.models.Book || mongoose.model<BookDB>("Book", BookModelSchema);

export default BookModel;