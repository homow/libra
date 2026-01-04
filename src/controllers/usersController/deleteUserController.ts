import type {Request, Response} from "express";
import {internalServerError} from "@utils/api-utils/response.js";
import {deleteUserService} from "@services/index.js";

export async function deleteUserController(
    req: Request<{ id: string }>,
    res: Response
) {
    const {id} = req.params;

    try {
        const result = await deleteUserService(id);
        return res.status(result.status).json(result.data);
    } catch (_) {
        return internalServerError(res);
    }
}