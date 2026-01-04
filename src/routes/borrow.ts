import {
    createBorrowController,
    getBorrowController
} from "@controllers/index.js";
import express from "express";
import {validateBody} from "@middleware/paresBody.js";
import {BorrowSchema} from "@src/validtaion/borrow.js";
import validateObjectId from "@middleware/validateObjectId.js";

const borrowRouter = express.Router();

borrowRouter
    .route("/")
    .get(getBorrowController);

borrowRouter
    .route("/:id")
    .get(getBorrowController)
    .post(validateObjectId(), validateBody(BorrowSchema), createBorrowController);

export default borrowRouter;