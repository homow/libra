import "@configs/db.js";
import usersRouter from "@routes/users.js";
import express, {type NextFunction} from 'express';
import type {Express, Request, Response} from 'express';
import booksRouter from "@routes/books.js";

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

app.use("/api/users", usersRouter);
app.use("/api/book", booksRouter);

export default app;