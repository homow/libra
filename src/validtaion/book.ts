import {z} from "zod";

const BookSchema = z.object({
    title: z
        .string()
        .min(2, "Title must be at least 2 characters")
        .max(50, "Title must be at most 50 characters"),
    author: z
        .string()
        .min(2, "Author must be at least 2 characters")
        .max(50, "Author must be at most 50 characters"),
    price: z
        .number()
        .positive("Price must be a positive number")
        .optional(),
});

export type BookInput = z.infer<typeof BookSchema>;
export {BookSchema};
