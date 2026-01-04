import type {Request, Response} from "express";
import {createCommentService} from "@src/services/index.js";
import type {InputComment} from "@src/validtaion/comment.js";
import {internalServerError} from "@utils/api-utils/response.js";

export async function createCommentController(
    req: Request<{}, {}, InputComment>,
    res: Response,
) {
    const {body, bookId} = req.body;

    try {
        const result = await createCommentService(
            body,
            bookId,
        );
        return res.status(result.status).json(result.data);
    } catch (_) {
        return internalServerError(res);
    }
}