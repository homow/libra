import type {Response, Request} from "express";
import {createBookService} from "@services/index.js";
import type {BookInput} from "@src/validtaion/book.js";
import {internalServerError} from "@utils/api-utils/response.js";

export async function createBookController(
    req: Request<{}, {}, BookInput>,
    res: Response
) {
    const body = req.body;

    try {
        const result = await createBookService(body);

        return res.status(result.status).json(result.data);
    } catch (_) {
        return internalServerError(res);
    }
}