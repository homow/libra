import {
    createBookController,
    getBookController
} from "@controllers/index.js";
import express from "express";
import {BookSchema} from "@src/validtaion/book.js";
import {validateBody} from "@middleware/paresBody.js";

const booksRouter = express.Router();

booksRouter
    .route("/")
    .post(validateBody(BookSchema), createBookController)
    .get(getBookController);

export default booksRouter;