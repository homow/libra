import type {Response, Request} from "express";
import {internalServerError} from "@lib/api/response.js";
import getUserService from "@services/usersService/getAllUserService.js";

export default async function getAllUserController(_: Request, res: Response) {
    try {
        const users = await getUserService();
        return res.status(users.status).send(users.data);
    } catch (_) {
        return internalServerError(res);
    }
}