import CommentModel from "@src/models/Comment.model.js";
import {checkBook} from "@utils/db-utils/book-utils.js";
import type {ServiceReturnDataType} from "@src/types/index.js";

export async function createCommentService(
    comment: string,
    bookId: string,
): Promise<ServiceReturnDataType> {
    const book = await checkBook({
        id: bookId,
    });

    if (!book) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "book not found!",
            },
        };
    }

    const newComment = await CommentModel
        .create({
            body: comment,
            book: bookId,
        });

    return {
        status: 201,
        data: {
            ok: true,
            message: "comment successfully created!",
            comment: newComment
        }
    };
}