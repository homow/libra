import {getSafeUser} from "@utils/api-utils/response.js";
import type {ServiceReturnDataType} from "@src/types/index.js";
import {checkUserDB} from "@utils/db-utils.js";

export async function getUserService(
    id: string,
): Promise<ServiceReturnDataType> {
    const user = await checkUserDB({id});

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