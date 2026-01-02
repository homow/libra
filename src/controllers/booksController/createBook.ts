import type {Response, Request} from "express";
import type {BookInput} from "@src/validtaion/book.js";
import {internalServerError} from "@lib/api/response.js";
import createBookService from "@services/booksService/createBook.js";

export default async function createBookController(
    req: Request<{}, {}, BookInput>,
    res: Response
) {
    const body = req.body;

    try {
        const result = await createBookService(body);

        return res.status(result.status).send(result.data);
    } catch (_) {
        return internalServerError(res);
    }
}