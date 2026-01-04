import type {Request, Response} from "express";
import {internalServerError} from "@utils/api-utils/response.js";
import {getBookService} from "@src/services/index.js";

export async function getBookController(
    _req: Request,
    res: Response
) {
    try {
        const result = await getBookService();
        return res.status(result.status).json(result.data);
    } catch (_) {
        return internalServerError(res);
    }
}