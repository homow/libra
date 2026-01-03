import BookModel from "@src/models/Book.model.js";

interface BookParams {
    id?: string;
    titleLower?: string;
    authorLower?: string;
    useAnd?: boolean;
}

export async function checkBook(
    {
        id,
        titleLower,
        authorLower,
        useAnd,
    }: BookParams
) {
    if (!id && !titleLower && !authorLower) return null;

    const query = [];

    if (id) query.push({_id: id});
    if (titleLower) query.push({titleLower});
    if (authorLower) query.push({authorLower});

    const mongoQuery = useAnd
        ? {$and: query}
        : {$or: query};

    const user = await BookModel
        .findOne(mongoQuery)
        .lean();

    return user || null;
}