import "@configs/db.js";
import UserModel from "@src/models/User.js";
import BookModel from "@src/models/Book.js";
import express, {type NextFunction} from 'express';
import {validateBody} from "@middleware/paresBody.js";
import type {Express, Request, Response} from 'express';
import {internalServerError} from "@lib/api/response.js";
import {UserSchema, type UserInput} from "@src/validtaion/user.js";
import {type BookInput, BookSchema} from "@src/validtaion/book.js";
import {getSafeUser} from "@lib/utils/userUtils.js";
import validateObjectId from "@middleware/validateObjectId.js";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({
            ok: false,
            message: "Invalid JSON",
        });
    }
    return next(err);
});

app.post('/api/user',
    validateBody(UserSchema),
    async (req: Request<{}, {}, UserInput>, res: Response) => {
        const parseBody = req.body;

        try {
            const user = await UserModel.findOne({
                email: parseBody.email,
            });

            if (user) {
                return res.status(409).json({
                    ok: false,
                    message: "User already exists",
                });
            }

            const newUser = await UserModel.create(parseBody);

            return res.status(201).json({
                ok: true,
                message: "User created successfully",
                user: getSafeUser(newUser),
            });
        } catch (_) {
            return internalServerError(res);
        }
    }
);

app.post('/api/book',
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

app.delete('/api/user/:id',
    validateObjectId,
    async (req: Request<{ id: string }>, res: Response) => {
        const id = req.params.id;

        try {
            const findUser = await UserModel.findOne({_id: id});

            if (!findUser) {
                return res.status(404).json({
                    ok: false,
                    message: "User does not exist",
                });
            }

            await UserModel.deleteOne({_id: id});

            res.status(200).json({
                ok: true,
                message: "User deleted successfully",
                user: getSafeUser(findUser),
            });
        } catch (_) {
            return internalServerError(res);
        }
    }
);

export default app;