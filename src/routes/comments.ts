import express from "express";
import {validateBody} from "@middleware/paresBody.js";
import CommentSchema from "@src/validtaion/comment.js";
import {createCommentController} from "@src/controllers/index.js";

const commentRoutes = express.Router();

commentRoutes
    .route("/")
    .post(validateBody(CommentSchema), createCommentController);

export default commentRoutes;