import UserModel from "@src/models/User.js";
import type {ServiceReturnDataType} from "@src/types/index.js";

export default async function getUserService(): Promise<ServiceReturnDataType> {
    const users = await UserModel.aggregate([{
        $project: {
            _id: 0,
            id: {$toString: "$_id"},
            createdAt: {$toString: "$createdAt"},
            updatedAt: {$toString: "$updatedAt"},
            name: 1,
            age: 1,
            email: 1,
            role: 1
        }
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