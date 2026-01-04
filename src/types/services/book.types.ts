interface ServiceReturnDataTypeBase {
    [key: string]: unknown;
    ok: boolean;
    message: string;
}

export interface ServiceReturnDataType {
    status: number;
    data: ServiceReturnDataTypeBase;
}