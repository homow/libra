import BookModel from "@src/models/Book.model.js";
import BorrowModel from "@src/models/Borrow.model.js";
import {checkBook} from "@utils/db-utils/book-utils.js";
import {checkUserDB} from "@utils/db-utils/user-utils.js";
import {getSafeBorrow} from "@utils/api-utils/response.js";
import type {ServiceReturnDataType} from "@src/types/index.js";

export async function createBorrowService(
    bookId: string,
    userId: string
): Promise<ServiceReturnDataType> {
    const book = await checkBook({
        id: bookId,
    });

    if (!book) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "Book not found",
            }
        };
    }

    if (!book.isAvailable) {
        return {
            status: 409,
            data: {
                ok: false,
                message: "Book not available",
            }
        };
    }

    const user = await checkUserDB({
        id: userId,
    });

    if (!user) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "User not found",
            }
        };
    }

    const newBorrow = await BorrowModel
        .create({bookId, userId});

    await BookModel.findByIdAndUpdate(bookId, {isAvailable: false});

    return {
        status: 201,
        data: {
            ok: true,
            message: "Borrow successfully created",
            borrow: getSafeBorrow(newBorrow),
        }
    };
}