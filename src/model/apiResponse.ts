import {ResponseData} from "./responseData";


export class ApiResponse {

    timestamp = new Date().toISOString();

    statusCode: number;

    name: string;

    responseCode: string;

    message: string;

    isOperational: boolean;

    constructor(statusCode:number, responseData: ResponseData, isOperational: boolean = true) {
        const { name, responseCode, message } = responseData;
        this.statusCode = statusCode;
        this.name = name;
        this.responseCode = responseCode;
        this.message = message;
        this.isOperational = isOperational;
    }
}

export {}