import express from "express";
import {BookSchema} from "@src/validtaion/book.js";
import {validateBody} from "@middleware/paresBody.js";
import createBookController from "@controllers/booksController/createBook.js";

const booksRouter = express.Router();

booksRouter.post('/create',
    validateBody(BookSchema),
    createBookController
);

export default booksRouter;