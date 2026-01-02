import UserModel from "@src/models/User.js";
import {getSafeUser} from "@lib/utils/userUtils.js";
import type {ServiceReturnDataType} from "@src/types/index.js";

export async function deleteUserService(
    id: string
): Promise<ServiceReturnDataType> {
    const deleteUser = await UserModel
        .findByIdAndDelete(id);

    if (!deleteUser) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "User does not exist",
            }
        };
    }

    return {
        status: 200,
        data: {
            ok: true,
            message: "User deleted successfully",
            user: getSafeUser(deleteUser),
        }
    };
}