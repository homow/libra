import UserModel from "@src/models/User.js";
import {getSafeUser} from "@lib/utils/userUtils.js";
import {validateBody} from "@middleware/paresBody.js";
import {internalServerError} from "@lib/api/response.js";
import express, {type Request, type Response} from 'express';
import validateObjectId from "@middleware/validateObjectId.js";
import {type UserInput, UserSchema} from "@src/validtaion/user.js";

const usersRouter = express.Router();

usersRouter.post('/signup',
    validateBody(UserSchema),
    async (req: Request<{}, {}, UserInput>, res: Response) => {
        const parseBody = req.body;

        try {
            const user = await UserModel.findOne({
                email: parseBody.email,
            });

            if (user) {
                return res.status(409).json({
                    ok: false,
                    message: "User already exists",
                });
            }

            const newUser = await UserModel.create(parseBody);

            return res.status(201).json({
                ok: true,
                message: "User created successfully",
                user: getSafeUser(newUser),
            });
        } catch (_) {
            return internalServerError(res);
        }
    }
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