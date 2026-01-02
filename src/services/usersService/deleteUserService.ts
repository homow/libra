import type {ServiceReturnDataType} from "@src/types/index.js";
import UserModel from "@src/models/User.js";
import {getSafeUser} from "@lib/utils/userUtils.js";

export default async function deleteUserService(
    id: string
): Promise<ServiceReturnDataType> {
    const findUser = await UserModel.findOne({
        _id: id
    });

    if (!findUser) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "User does not exist",
            }
        };
    }

    await UserModel.deleteOne({_id: id});

    return {
        status: 200,
        data: {
            ok: true,
            message: "User deleted successfully",
            user: getSafeUser(findUser),
        }
    };
};