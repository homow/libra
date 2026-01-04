import mongoose from "mongoose";
import type {NextFunction, Request, Response} from "express";

export default function validateObjectId(id?: string) {
    return (
        req: Request<{ id?: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const isValid: boolean = mongoose.isValidObjectId(
            req.params.id || id
        );

        if (!isValid) {
            return res.status(400).json({
                ok: false,
                message: "Invalid format id",
            });
        }

        return next();
    };
}