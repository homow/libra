import {getBorrows, getOneBorrow} from "@utils/db-utils/borrow-utils.js";
import type {ServiceReturnDataType} from "@src/types/index.js";

export async function getBorrowService(
    id?: string
): Promise<ServiceReturnDataType> {
    if (id) return getOneBorrow(id);
    return getBorrows();
}