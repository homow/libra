import type {Request, Response} from "express";
import {getUserService} from "@services/index.js";
import {internalServerError} from "@lib/api/response.js";

export async function getUserController
(
    req: Request<{ id: string }>,
    res: Response,
): Promise<void> {
    const {id} = req.params;

    try {
        const result = await getUserService(id);
        res.status(result.status).json(result.data);
    } catch (_) {
        return internalServerError(res);
    }
}