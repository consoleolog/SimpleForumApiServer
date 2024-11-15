import {ErrorData} from "./errorData";
import {CommonUtil} from "../utils/common.util";


export class ApiError extends Error {

    timestamp: string;

    statusCode: number;

    name: string;

    errorCode: string;

    message: string;

    isOperational: boolean;

    stack? : string | undefined;

    constructor(statusCode: number, errorData: ErrorData, isOperational: boolean = true, stack = '' ) {
        const { name, errorCode, message } = errorData;
        super(message);
        this.timestamp = new Date().toISOString();
        this.statusCode = statusCode;
        this.name = name;
        this.errorCode = errorCode;
        this.message = message;
        this.isOperational = isOperational;
        if (!CommonUtil.isEmpty(stack)){
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}