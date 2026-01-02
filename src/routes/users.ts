import express from 'express';
import {UserSchema} from "@src/validtaion/user.js";
import {validateBody} from "@middleware/paresBody.js";
import validateObjectId from "@middleware/validateObjectId.js";
import getUserController from "@controllers/usersController/getUserController.js";
import deleteUserController from "@controllers/usersController/deleteUserController.js";
import signupUserController from "@controllers/usersController/signupUserController.js";
import getAllUserController from "@controllers/usersController/getAllUserController.js";

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