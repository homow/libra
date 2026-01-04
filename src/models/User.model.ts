import mongoose, {type Model, type Schema} from "mongoose";
import {type UserDB, UserRole} from "@src/types/models/user.types.js";

const UserModelSchema: Schema<UserDB> = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [20, "Name cannot exceed 20 characters"]
        },
        email: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
            min: 17,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.USER,
            required: true,
        }
    },
    {timestamps: true}
);

UserModelSchema.index(
    {email: 1},
    {unique: true},
);

const UserModel: Model<UserDB> =
    mongoose.models.User
    || mongoose.model<UserDB>("User", UserModelSchema);

export default UserModel;