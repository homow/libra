import type {Request, Response} from "express";
import type {BorrowInput} from "@src/validtaion/borrow.js";
import {internalServerError} from "@utils/api-utils/response.js";

export async function createBorrowController(
    req: Request<{}, {}, BorrowInput>,
    res: Response
) {
    try {
        const body = req.body;

    } catch (_) {
        return internalServerError(res);
    }
}