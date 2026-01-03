import express from "express";
import {BorrowSchema} from "@src/validtaion/borrow.js";
import {validateBody} from "@middleware/paresBody.js";
import {createBorrowController} from "@controllers/index.js";

const borrowRouter = express.Router();

borrowRouter
    .route("/")
    .post(validateBody(BorrowSchema), createBorrowController);