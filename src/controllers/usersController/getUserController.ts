import type {Request, Response} from "express";
import {internalServerError} from "@lib/api/response.js";
import getUserService from "@services/usersService/getUserService.js";

export default async function getUserController
(
    req: Request<{ id: string }>,
    res: Response,
) {
    const {id} = req.params;

    try {
        const result = await getUserService(id);
        res.status(result.status).json(result.data);
    } catch (_) {
        return internalServerError(res);
    }
}