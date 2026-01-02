import "@configs/db.js";
import cors from "cors";
import express from 'express';
import booksRouter from "@routes/books.js";
import usersRouter from "@routes/users.js";
import type {Express, Request, Response} from 'express';
import validateGlobalBody from "@middleware/validateGlobalBody.js";
import {createPath} from "@configs/paths.js";

const app: Express = express();

// --- Global-cors security ---
app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "example.com" : "*",
    credentials: true
}));

// --- Global parsers ---
app.use(express.json({
    strict: true
}));
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(createPath("public")));

// --- test ---
app.get("/",
    (_req: express.Request, res: express.Response) => {
        return res.sendFile(createPath("src/views/home.html"));
    }
);
app.get("/about",
    (_req: express.Request, res: express.Response) => {
        return res.sendFile(createPath("src/views/about.html"));
    }
);

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