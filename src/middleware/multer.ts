import multer from "multer";
import path from "node:path";
import type {Request, Response, NextFunction} from "express";

const storage = multer.diskStorage({
    destination: (
        _req,
        _file,
        cb
    ) => {
        cb(null, "./public/uploads/");
    },
    filename: (
        _req,
        file,
        cb
    ) => {
        const random: number = Math.round(Math.random() * 100);

        const filename: string =
            Date.now()
            + "_"
            + random
            + path.extname(file.originalname).toLowerCase();

        cb(null, filename);
    }
});

const MAX_SIZE: number = 3 * 1024 * 1024;

const uploader = multer({
    storage,
    limits: {
        fileSize: MAX_SIZE,
    },
    fileFilter(
        _req,
        file,
        cb
    ) {
        const allowed = /jpg|jpeg|png|webp|pdf/;
        const ext: string = path.extname(file.originalname).toLowerCase();

        if (allowed.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only jpg - jpeg - png - pdf - webp'));
        }
    }
});

export function middlewareUploader() {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        uploader.single("file")(req, res, (err) => {
            if (err) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res
                        .status(400)
                        .json({
                            ok: false,
                            message: "file is too large, must be less than 3MB"
                        });
                }
                return res.status(400).json({
                    ok: false,
                    message: err.message
                });
            }
            return next();
        });
    };
}

export {uploader};