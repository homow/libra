import type {ServiceReturnDataType} from "@src/types/index.js";
import BookModel from "@src/models/Book.model.js";

export async function getBookService(

): Promise<ServiceReturnDataType> {
    const books = await BookModel
        .find({})
        .populate("comments");

    if (!books) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "No books found."
            }
        };
    }

    return {
        status: 200,
        data: {
            ok: false,
            message: "Successfully retrieved books",
            books
        }
    };
}