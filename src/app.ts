import "@configs/db.js";
import cors from "cors";
import express from 'express';
import booksRouter from "@routes/books.js";
import usersRouter from "@routes/users.js";
import {createPath} from "@configs/paths.js";
import borrowRouter from "@routes/borrow.js";
import commentRoutes from "@routes/comments.js";
import type {Express, Request, Response} from 'express';
import validateGlobalBody from "@middleware/validateGlobalBody.js";

const app: Express = express();

// --- Global-cors security ---
app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? "example.com" :
        `http://localhost:${process.env.PORT}`,
    credentials: true
}));

// --- Global parsers ---
app.use(express.json({
    strict: true
}));
app.use(express.urlencoded({
    extended: true
}));

// Static files (CSS, images, JS)
app.use(express.static(createPath("public")));

// --- Routes ---
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowRouter);
app.use("/api/comments", commentRoutes);

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