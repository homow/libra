import BookModel from "@src/models/Book.js";
import type {BookInput} from "@src/validtaion/book.js";
import type {ServiceReturnDataType} from "@src/types/index.js";

export default async function createBookService(
    body: BookInput
): Promise<ServiceReturnDataType> {
    const existBook = await BookModel
        .findOne({
            titleLower: body.title.toLowerCase(),
            authorLower: body.author.toLowerCase(),
        });

    if (existBook) {
        return {
            status: 409,
            data: {
                ok: false,
                message: "Book already exists",
            }
        };
    }

    const newBook = await BookModel
        .create({
            ...body,
            price: body.price ?? 0,
            titleLower: body.title.toLowerCase(),
            authorLower: body.author.toLowerCase(),
        });

    return {
        status: 200,
        data: {
            ok: true,
            message: "Book created successfully",
            book: {
                id: newBook._id.toString(),
                title: newBook.title,
                author: newBook.author,
                price: newBook.price,
                createdAt: newBook.createdAt.toISOString(),
                updatedAt: newBook.updatedAt.toISOString(),
            },
        }
    };
}