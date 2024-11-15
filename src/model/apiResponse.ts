import {ResponseData} from "./responseData";


export class ApiResponse {

    timestamp:string;

    statusCode: number;

    name: string;

    responseCode: string;

    message: string;

    isOperational: boolean;

    constructor(statusCode:number, responseData: ResponseData, isOperational: boolean = true) {
        const { name, responseCode, message } = responseData;
        this.timestamp = new Date().toISOString();
        this.statusCode = statusCode;
        this.name = name;
        this.responseCode = responseCode;
        this.message = message;
        this.isOperational = isOperational;
    }
}