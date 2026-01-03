import UserModel from "@src/models/User.model.js";

export async function checkUserDB(
    {
        id,
        email
    }: {
        id?: string;
        email?: string;
    }
) {
    if (!email && !id) return null;

    const query = [];

    if (email) query.push({email});
    if (id) query.push({_id: id});

    const user = await UserModel
        .findOne({$or: query})
        .lean();

    return user || null;
}