import type {BorrowDB} from "@src/types/index.js";
import mongoose, {Types, type Schema, type Model} from "mongoose";

const BorrowModelSchema: Schema<BorrowDB> = new mongoose.Schema({
    bookId: {
        type: Types.ObjectId,
        ref: "Book",
        required: true,
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    borrowedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    isReturned: {
        type: Boolean,
        default: false,
        required: true,
    },
    returnedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true
});

BorrowModelSchema.pre("save", async function () {
    if (this.returnedAt && !this.isReturned) {
        this.isReturned = true;
    } else if (!this.returnedAt && this.isReturned) {
        this.returnedAt = new Date();
    }
});

BorrowModelSchema.index(
    {bookId: 1, userId: 1, isReturned: 1}
);

const BorrowModel: Model<BorrowDB> =
    mongoose.models.Borrow
    || mongoose.model<BorrowDB>("Borrow", BorrowModelSchema);

export default BorrowModel;