import mongoose from "mongoose";
import BorrowModel from "@src/models/Borrow.model.js";
import {getSafeBorrow} from "@utils/api-utils/response.js";
import {checkBorrowDB} from "@utils/db-utils/borrow-utils.js";
import type {ServiceReturnDataType} from "@src/types/index.js";
import {userProjectStage} from "@src/aggregations/user.aggregate.js";
import {bookProjectStage} from "@src/aggregations/book.aggregate.js";

export async function getBorrowService(
    id?: string
): Promise<ServiceReturnDataType> {
    if (id) {
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