import mongoose, {type PipelineStage} from "mongoose";
import {userProjectStage} from "@src/aggregations/user.aggregate.js";
import {bookProjectStage} from "@src/aggregations/book.aggregate.js";

const borrowAggregate = [
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
];

interface BorrowFilter {
    id?: string;
    userId?: string;
    bookId?: string;
}

export function getBorrowAggregate(
    filter?: BorrowFilter,
    useAnd: boolean = false
) {
    const stages: PipelineStage[] = [...borrowAggregate];

    if (!filter) return stages;

    const conditions: Record<string, mongoose.Types.ObjectId>[] = [];

    if (filter.id) conditions.push({_id: new mongoose.Types.ObjectId(filter.id)});
    if (filter.userId) conditions.push({userId: new mongoose.Types.ObjectId(filter.userId)});
    if (filter.bookId) conditions.push({bookId: new mongoose.Types.ObjectId(filter.bookId)});

    if (conditions.length === 0) return stages;

    let matchStage: Record<string, unknown>;
    if (useAnd) {
        matchStage = Object.assign({}, ...conditions);
    } else {
        matchStage = {$or: conditions};
    }

    stages.unshift({$match: matchStage} as PipelineStage);

    return stages;
}