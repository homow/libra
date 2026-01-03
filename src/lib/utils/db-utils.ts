import UserModel from "@src/models/User.model.js";

export async function checkUserDB(id: string) {
    const user = await UserModel
        .findOne({id})
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

    return user;
}