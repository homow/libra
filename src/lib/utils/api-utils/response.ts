import type {Response} from "express";
import type {BorrowDB, UserDB} from "@src/types/index.js";

export function internalServerError(res: Response) {
    res.status(500).json({
        ok: false,
        error: "Internal Server Error"
    });
}

export function getSafeUser(data: UserDB) {
    return {
        id: data._id.toString(),
        role: data.role,
        name: data.name,
        email: data.email,
        age: data.age,
        createdAt: data.createdAt.toISOString(),
        updatedAt: data.updatedAt.toISOString(),
    };
}

export function getSafeBorrow(data: BorrowDB) {
    return {
        id: data._id.toString(),
        userId: data.userId,
        bookId: data.bookId,
        createdAt: data.createdAt.toISOString(),
        updatedAt: data.updatedAt.toISOString(),
        returnedAt: data.returnedAt ? data.returnedAt?.toISOString() : null,
        borrowedAt: data.borrowedAt?.toISOString(),
        isReturned: data.isReturned,
    };
}