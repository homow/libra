import multer from "multer";
import path from "node:path";

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
            + path.extname(file.originalname);

        cb(null, filename);
    }
});

const uploader = multer({storage});

export {uploader};