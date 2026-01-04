import type {Response} from "express";

export function internalServerError(res: Response, message?: string) {
    return res.status(500).json({
        ok: false,
        error: message || "Internal Server Error"
    });
}