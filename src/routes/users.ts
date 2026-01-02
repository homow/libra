import express from 'express';
import {UserSchema} from "@src/validtaion/user.js";
import {validateBody} from "@middleware/paresBody.js";
import {getUserController} from "@controllers/index.js";
import {deleteUserController} from "@controllers/index.js";
import {signupUserController} from "@controllers/index.js";
import {getAllUserController} from "@controllers/index.js";
import validateObjectId from "@middleware/validateObjectId.js";

const usersRouter = express.Router();

usersRouter
    .route("/")
    .get(getAllUserController);

usersRouter
    .route("/:id")
    .delete(validateObjectId(), deleteUserController)
    .get(validateObjectId(), getUserController);

usersRouter
    .route("/signup")
    .post(validateBody(UserSchema), signupUserController);

export default usersRouter;