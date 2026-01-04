import type {BookDB} from "@src/types/index.js";
import mongoose, {Schema, type Model} from "mongoose";

const BookModelSchema: Schema<BookDB> = new mongoose.Schema(
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
        titleLower: {
            type: String,
            required: true,
            index: true,
        },
        authorLower: {
            type: String,
            required: true,
            index: true,
        },
        isAvailable: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

BookModelSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "book",
});

BookModelSchema.set("toObject", {virtuals: true});
BookModelSchema.set("toJSON", {
    virtuals: true,
    transform: (_doc, ret) => {
        delete ret.__v;
        ret.createdAt = ret.createdAt instanceof Date
            ? ret.createdAt.toISOString()
            : ret.createdAt;
        ret.updatedAt = ret.updatedAt instanceof Date
            ? ret.updatedAt.toISOString()
            : ret.updatedAt;
        return ret;
    }
});

BookModelSchema.index(
    {titleLower: 1, authorLower: 1},
    {
        unique: true, collation: {
            locale: "en", strength: 2
        }
    }
);

BookModelSchema.pre("save", async function () {
    this.title = this.title.replace(/\s+/g, " ");
    this.author = this.author.replace(/\s+/g, " ");

    this.titleLower = this.title.toLowerCase();
    this.authorLower = this.author.toLowerCase();
});

const BookModel: Model<BookDB> =
    mongoose.models.Book
    || mongoose.model<BookDB>("Book", BookModelSchema);

export default BookModel;