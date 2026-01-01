import type {Response} from "express";

export function internalServerError(res: Response) {
    res.status(500).json({
        ok: false,
        error: "Internal Server Error"
    });
}