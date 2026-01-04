import {z} from "zod";

export const UserSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name cannot exceed 20 characters")
        .optional(),
    email: z.email("Invalid email address"),
    age: z.number().min(17, "Age must be at least 17"),
});

export type UserInput = z.infer<typeof UserSchema>;