import "@configs/db.js";
import express from 'express';
import booksRouter from "@routes/books.js";
import usersRouter from "@routes/users.js";
import type {Express, Request, Response} from 'express';
import validateGlobalBody from "@middleware/validateGlobalBody.js";

const app: Express = express();

// --- Global parsers ---
app.use(express.json({
    strict: true
}));
app.use(express.urlencoded({
    extended: true
}));

// --- Routes ---
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);

// --- 404 handler ---
app.use((_req: Request, res: Response) => {
    return res.status(404).json({
        ok: false,
        message: "Not Found",
    });
});

// --- Global error handler (JSON Syntax) ---
app.use(validateGlobalBody);

export default app;