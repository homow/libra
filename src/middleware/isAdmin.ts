import UserModel from "@src/models/User.js";
import {UserRole} from "@src/types/index.js";
import type {Request, Response, NextFunction} from "express";

export default function isAdmin() {
    return async (req: Request<{ id: string }>, _res: Response, next: NextFunction) => {
        const user = await UserModel.findById(req.params.id).lean();

        console.log(user);

        if (user && user.role !== UserRole.ADMIN) {
            return _res.status(403).json({
                ok: false,
                message: "You are not authorized to access this page."
            });
        }

        return next();
    };
}