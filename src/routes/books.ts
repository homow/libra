import BookModel from "@src/models/Book.js";
import {validateBody} from "@middleware/paresBody.js";
import {internalServerError} from "@lib/api/response.js";
import express, {type Request, type Response} from "express";
import {type BookInput, BookSchema} from "@src/validtaion/book.js";

const booksRouter = express.Router();

booksRouter.post('/create',
    validateBody(BookSchema),
    async (req: Request<{}, {}, BookInput>, res: Response) => {
        const body = req.body;

        try {
            const existBook = await BookModel.findOne({
                titleLower: body.title.toLowerCase(),
                authorLower: body.author.toLowerCase(),
            });

            if (existBook) {
                return res.status(409).json({
                    ok: false,
                    message: "Book already exists",
                });
            }

            const newBook = await BookModel.create({
                ...body,
                price: body.price ?? 0,
                titleLower: body.title.toLowerCase(),
                authorLower: body.author.toLowerCase(),
            });

            return res.status(201).json({
                ok: true,
                message: "Book created successfully",
                book: {
                    id: newBook._id.toString(),
                    title: newBook.title,
                    author: newBook.author,
                    price: newBook.price,
                    createdAt: newBook.createdAt.toISOString(),
                    updatedAt: newBook.updatedAt.toISOString(),
                },
            });
        } catch (_) {
            return internalServerError(res);
        }
    }
);

export default booksRouter;