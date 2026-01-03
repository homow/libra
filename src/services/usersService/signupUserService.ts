import UserModel from "@src/models/User.model.js";
import type {UserInput} from "@src/validtaion/user.js";
import {getSafeUser} from "@utils/api-utils/response.js";
import {type ServiceReturnDataType, UserRole} from "@src/types/index.js";
import {checkUserDB} from "@utils/db-utils.js";

export async function signupUserService(
    body: UserInput
): Promise<ServiceReturnDataType> {
    const user = await checkUserDB({
        email: body.email
    });

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