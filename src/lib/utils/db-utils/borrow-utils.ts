import mongoose from "mongoose";
import BorrowModel from "@src/models/Borrow.model.js";
import {getSafeBorrow} from "@utils/api-utils/response.js";
import type {ServiceReturnDataType} from "@src/types/index.js";
import {bookProjectStage} from "@src/aggregations/book.aggregate.js";
import {userProjectStage} from "@src/aggregations/user.aggregate.js";

interface Params {
    id?: string;
    bookId?: string;
    userId?: string;
    useAnd?: boolean;
}

export async function checkBorrowDB(
    {
        id,
        bookId,
        userId,
        useAnd,
    }: Params
) {
    if (!id && !bookId && !userId) return null;

    let query = [];

    if (id) query.push({_id: id});
    if (bookId) query.push({bookId});
    if (userId) query.push({userId});

    const mongoQuery = useAnd
        ? {$and: query}
        : {$or: query};

    const borrow = await BorrowModel
        .findOne(mongoQuery)
        .lean()
        .populate("bookId")
        .populate("userId");

    return borrow || null;
}

export async function getOneBorrow(
    id: string
): Promise<ServiceReturnDataType> {
    const isValid: boolean = mongoose.isValidObjectId(id);

    if (!isValid) {
        return {
            status: 401,
            data: {
                ok: false,
                message: "borrow id is invalid",
            }
        };
    }

    const borrow = await checkBorrowDB({id});

    if (borrow) {
        return {
            status: 200,
            data: {
                ok: true,
                message: "borrow successfully found",
                borrow: getSafeBorrow(borrow)
            }
        };
    }

    return {
        status: 404,
        data: {
            ok: false,
            message: "borrow not found"
        }
    };
}

export async function getBorrows(): Promise<ServiceReturnDataType> {
    const borrows = await BorrowModel.aggregate([
        {
            $lookup: {
                from: "users",
                let: {userId: "$userId"},
                pipeline: [{
                    $match: {
                        $expr: {$eq: ["$_id", "$$userId"]}
                    }
                }, userProjectStage],
                as: "user"
            }
        },
        {
            $lookup: {
                from: "books",
                let: {bookId: "$bookId"},
                pipeline: [{
                    $match: {
                        $expr: {$eq: ["$_id", "$$bookId"]}
                    }
                }, bookProjectStage],
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

    return {
        status: 200,
        data: {
            ok: true,
            message: "borrows successfully found",
            borrows
        }
    };
}