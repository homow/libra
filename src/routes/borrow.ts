import express from "express";
import {validateBody} from "@middleware/paresBody.js";
import {BorrowSchema} from "@src/validtaion/borrow.js";
import {createBorrowController} from "@controllers/index.js";
import validateObjectId from "@middleware/validateObjectId.js";

const borrowRouter = express.Router();

borrowRouter
    .route("/:id")
    .post(validateObjectId(), validateBody(BorrowSchema), createBorrowController);

export default borrowRouter;