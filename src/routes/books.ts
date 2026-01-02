import express from "express";
import {BookSchema} from "@src/validtaion/book.js";
import {validateBody} from "@middleware/paresBody.js";
import {createBookController} from "@controllers/index.js";

const booksRouter = express.Router();

booksRouter
    .route("/")
    .post(validateBody(BookSchema), createBookController);

export default booksRouter;