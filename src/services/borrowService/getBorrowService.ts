import type {ServiceReturnDataType} from "@src/types/index.js";
import {getBorrows, getOneBorrow} from "@utils/db-utils/borrow-utils.js";

export async function getBorrowService(
    id?: string
): Promise<ServiceReturnDataType> {
    if (id) return getOneBorrow(id);
    return getBorrows();
}