import type {Request, Response} from "express";
import {createBorrowService} from "@services/index.js";
import type {BorrowInput} from "@src/validtaion/borrow.js";
import {internalServerError} from "@utils/api-utils/response.js";

export async function createBorrowController(
    req: Request<{ id: string }, {}, BorrowInput>,
    res: Response
) {
    try {
        const {userId} = req.body;
        const bookId: string = req.params.id;

        const result = await createBorrowService(bookId, userId);

        return res.status(result.status).json(result.data);
    } catch (_) {
        return internalServerError(res);
    }
}