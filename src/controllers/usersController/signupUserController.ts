import type {Request, Response} from "express";
import type {UserInput} from "@src/validtaion/user.js";
import {internalServerError} from "@lib/api/response.js";
import signupUserService from "@services/usersService/signupUserService.js";

export default async function signupUserController(
    req: Request<{}, {}, UserInput>,
    res: Response
) {
    const body = req.body;

    try {
        const result = await signupUserService(body);

        return res.status(result.status).json(result.data);
    } catch (_) {
        return internalServerError(res);
    }
}