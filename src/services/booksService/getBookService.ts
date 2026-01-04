import BookModel from "@src/models/Book.model.js";
import type {ServiceReturnDataType} from "@src/types/index.js";

export async function getBookService(

): Promise<ServiceReturnDataType> {
    const books = await BookModel
        .find({})
        .populate("comments", "-__v");

    if (!books) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "No books found."
            }
        };
    }

    console.log(typeof books[0]?.createdAt);
    console.log(books[0]?.createdAt instanceof Date);
    console.log(books);

    return {
        status: 200,
        data: {
            ok: true,
            message: "Successfully retrieved books",
            books
        }
    };
}