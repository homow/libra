export const userProjectStage = {
    $project: {
        _id: 0,
        id: {$toString: "$_id"},
        name: 1,
        age: 1,
        email: 1,
        role: 1,
        createdAt: {$toString: "$createdAt"},
        updatedAt: {$toString: "$updatedAt"}
    }
};