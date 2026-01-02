import type {Request, Response} from "express";
import {signupUserService} from "@services/index.js";
import type {UserInput} from "@src/validtaion/user.js";
import {internalServerError} from "@lib/api/response.js";

export async function signupUserController(
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