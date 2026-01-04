import type {Response, Request} from "express";
import {getAllUserService} from "@services/index.js";
import {internalServerError} from "@utils/api-utils/response.js";

export async function getAllUserController(_: Request, res: Response) {
    try {
        const users = await getAllUserService();
        return res.status(users.status).json(users.data);
    } catch (_) {
        return internalServerError(res);
    }
}