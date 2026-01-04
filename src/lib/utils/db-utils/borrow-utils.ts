import mongoose from "mongoose";
import BorrowModel from "@src/models/Borrow.model.js";
import type {ServiceReturnDataType} from "@src/types/index.js";
import {getBorrowAggregate} from "@src/aggregations/borrow.aggregate.js";

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

    const filter = {
        userId,
        bookId,
        id
    };

    const borrow = await BorrowModel
        .aggregate(getBorrowAggregate(filter, useAnd));

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

    const borrow = await checkBorrowDB({id, useAnd: false});

    if (borrow) {
        return {
            status: 200,
            data: {
                ok: true,
                message: "borrow successfully found",
                borrow
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
    const borrows = await BorrowModel
        .aggregate(getBorrowAggregate());

    return {
        status: 200,
        data: {
            ok: true,
            message: "borrows successfully found",
            borrows
        }
    };
}