import mongoose, {type Model, type Schema} from "mongoose";
import type {UserDB} from "@src/types/models/user.types.js";

const UserModelSchema: Schema<UserDB> = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [20, "Name cannot exceed 20 characters"]
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        age: {
            type: Number,
            required: true,
            min: 17,
        }
    },
    {timestamps: true}
);

UserModelSchema.index(
    {email: 1},
    {unique: true},
);

const UserModel: Model<UserDB> =
    mongoose.models.User || mongoose.model<UserDB>("User", UserModelSchema);

export default UserModel;