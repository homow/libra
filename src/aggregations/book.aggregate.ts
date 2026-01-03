export const bookProjectStage = {
    $project: {
        _id: 0,
        id: { $toString: "$_id" },
        title: 1,
        author: 1,
        price: 1,
        isAvailable: 1,
        createdAt: { $toString: "$createdAt" },
        updatedAt: { $toString: "$updatedAt" }
    }
};