import type {Request, Response} from "express";
import {internalServerError} from "@utils/api-utils/response.js";
import {getBorrowService} from "@src/services/index.js";

export async function getBorrowController(
    req: Request,
    res: Response,
) {
    const {id} = req.params;

    try {
        const result = await getBorrowService(id);
        return res.status(result.status).send(result.data);
    } catch (_) {
        console.log(_);
        return internalServerError(res);
    }
}