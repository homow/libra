import UserModel from "@src/models/User.js";
import {getSafeUser} from "@lib/utils/userUtils.js";
import {validateBody} from "@middleware/paresBody.js";
import {internalServerError} from "@lib/api/response.js";
import express, {type Request, type Response} from 'express';
import validateObjectId from "@middleware/validateObjectId.js";
import {UserSchema} from "@src/validtaion/user.js";
import signupUserController from "@controllers/usersController/signupUserController.js";

const usersRouter = express.Router();

usersRouter.post('/signup',
    validateBody(UserSchema),
    signupUserController
);

usersRouter.delete('/:id',
    validateObjectId(),
    async (req: Request<{ id: string }>, res: Response) => {
        const id = req.params.id;

        try {
            const findUser = await UserModel.findOne({_id: id});

            if (!findUser) {
                return res.status(404).json({
                    ok: false,
                    message: "User does not exist",
                });
            }

            await UserModel.deleteOne({_id: id});

            res.status(200).json({
                ok: true,
                message: "User deleted successfully",
                user: getSafeUser(findUser),
            });
        } catch (_) {
            return internalServerError(res);
        }
    }
);

export default usersRouter;