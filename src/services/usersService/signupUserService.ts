import type {UserInput} from "@src/validtaion/user.js";
import UserModel from "@src/models/User.js";
import {getSafeUser} from "@lib/utils/userUtils.js";
import {type ServiceReturnDataType, UserRole} from "@src/types/index.js";

export default async function signupUserService(
    body: UserInput
): Promise<ServiceReturnDataType> {
    const user = await UserModel.findOne({
        email: body.email,
    }).lean();

    if (user) {
        return {
            status: 409,
            data: {
                ok: false,
                message: "User already exists",
            }
        };
    }

    const newUser = await UserModel.create({
        ...body,
        role: UserRole.USER
    });

    return {
        status: 201,
        data: {
            ok: true,
            message: "User created successfully",
            user: getSafeUser(newUser),
        }
    };
}