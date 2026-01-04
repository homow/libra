import BorrowModel from "@src/models/Borrow.model.js";

interface Params {
    id?: string;
    bookId?: string;
    userId?: string;
    useAnd?: boolean;
}

export async function checkBorrowDB(
    {
        id,
        bookId,
        userId,
        useAnd,
    }: Params
) {
    if (!id && !bookId && !userId) return null;

    let query = [];

    if (id) query.push({_id: id});
    if (bookId) query.push({bookId});
    if (userId) query.push({userId});

    const mongoQuery = useAnd
        ? {$and: query}
        : {$or: query};

    const borrow = await BorrowModel
        .findOne(mongoQuery)
        .lean()
        .populate("bookId")
        .populate("userId");

    return borrow || null;
}