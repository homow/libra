import mongoose from "mongoose";
import BookModel from "@src/models/Book.model.js";
import BorrowModel from "@src/models/Borrow.model.js";
import {checkBook} from "@utils/db-utils/book-utils.js";
import {checkUserDB} from "@utils/db-utils/user-utils.js";
import type {ServiceReturnDataType} from "@src/types/index.js";
import {userProjectStage} from "@src/aggregations/user.aggregate.js";
import {bookProjectStage} from "@src/aggregations/book.aggregate.js";

export async function createBorrowService(
    bookId: string,
    userId: string
): Promise<ServiceReturnDataType> {
    const book = await checkBook({
        id: bookId,
    });

    if (!book) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "Book not found",
            }
        };
    }

    if (!book.isAvailable) {
        return {
            status: 409,
            data: {
                ok: false,
                message: "Book not available",
            }
        };
    }

    const user = await checkUserDB({
        id: userId,
    });

    if (!user) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "User not found",
            }
        };
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newBorrow = await BorrowModel
            .create({bookId, userId});

        await BookModel.findByIdAndUpdate(bookId, {isAvailable: false});

        const borrow = await BorrowModel.aggregate([
            {
                $match: {_id: new mongoose.Types.ObjectId(newBorrow._id)}
            },
            {
                $lookup: {
                    from: "users",
                    let: {userId: "$userId"},
                    pipeline: [
                        {$match: {$expr: {$eq: ["$_id", "$$userId"]}}},
                        userProjectStage
                    ],
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "books",
                    let: {bookId: "$bookId"},
                    pipeline: [
                        {$match: {$expr: {$eq: ["$_id", "$$bookId"]}}},
                        bookProjectStage
                    ],
                    as: "book"
                }
            },
            {$unwind: "$user"},
            {$unwind: "$book"},
            {
                $project: {
                    _id: 0,
                    id: {$toString: "$_id"},
                    user: 1,
                    book: 1,
                    borrowedAt: 1,
                    returnedAt: 1,
                    isReturned: 1,
                    createdAt: {$toString: "$createdAt"},
                    updatedAt: {$toString: "$updatedAt"}
                }
            }
        ]);

        await session.commitTransaction();
        await session.endSession();

        return {
            status: 201,
            data: {
                ok: true,
                message: "Borrow successfully created",
                borrow
            }
        };

    } catch (_) {
        await session.abortTransaction();
        await session.endSession();
        throw _;
    }
}