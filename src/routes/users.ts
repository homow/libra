import express from 'express';
import {UserSchema} from "@src/validtaion/user.js";
import {validateBody} from "@middleware/paresBody.js";
import validateObjectId from "@middleware/validateObjectId.js";
import deleteUserController from "@controllers/usersController/deleteUserController.js";
import signupUserController from "@controllers/usersController/signupUserController.js";

const usersRouter = express.Router();

usersRouter.post('/signup',
    validateBody(UserSchema),
    signupUserController
);

usersRouter.delete('/:id',
    validateObjectId(),
    deleteUserController
);

export default usersRouter;