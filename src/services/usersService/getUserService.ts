import UserModel from "@src/models/User.js";
import {getSafeUser} from "@lib/utils/userUtils.js";
import type {ServiceReturnDataType} from "@src/types/index.js";

export async function getUserService(
    id: string,
): Promise<ServiceReturnDataType> {
    const user = await UserModel
        .findById(id)
        .lean();

    if (!user) {
        return {
            status: 404,
            data: {
                ok: false,
                message: 'User not found',
            }
        };
    }

    return {
        status: 200,
        data: {
            ok: true,
            message: 'User Successfully found',
            user: getSafeUser(user)
        }
    };
}