import type {NextFunction, Request, Response} from "express";

export default function globalInternalServerError(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    return res.status(500).json({
        ok: false,
        message: err.message || "Internal Server Error"
    });
}