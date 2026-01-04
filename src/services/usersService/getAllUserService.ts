import UserModel from "@src/models/User.model.js";
import type {ServiceReturnDataType} from "@src/types/index.js";
import {userProjectStage} from "@src/aggregations/user.aggregate.js";

export async function getAllUserService(): Promise<ServiceReturnDataType> {
    const users = await UserModel.aggregate([{
        ...userProjectStage
    }]);

    if (
        !users
        || users.length <= 0
    ) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "users not found",
            }
        };
    }

    return {
        status: 200,
        data: {
            ok: true,
            message: "users successfully found",
            users,
        }
    };
}