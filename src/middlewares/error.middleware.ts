import {ErrorRequestHandler} from "express";
import {ApiError} from "../model/apiError";
import {errorDatas} from "../model/errorData";
import config from "../config/config";
import logger from "../config/logger";


export const errorConverter: ErrorRequestHandler = (err: Error, req, res, next)=> {
    let error = err;
    if (!(error instanceof ApiError) ) {
        const statusCode = 500;
        const message = error.message || errorDatas.INTERNAL_SERVER_ERROR.message;
        error = new ApiError(statusCode, { ...errorDatas.UNKNOWN_ERROR, message }, false, error.stack);
    }
    next(error);
}


export const errorHandler: ErrorRequestHandler = (err: ApiError, req, res, next)=> {
    let { statusCode, errorCode, message, name } = err;
    if (config.env === 'production' && !err.isOperational){
        statusCode = 500;
        errorCode = errorDatas.INTERNAL_SERVER_ERROR.errorCode;
        message = errorDatas.INTERNAL_SERVER_ERROR.message;
        name = errorDatas.INTERNAL_SERVER_ERROR.name;
    }
    res.locals.errorMessage = err.message;

    const response = {
        name,
        errorCode,
        message,
        ...(config.env === 'development' && { stack : err.stack }),
    };

    if (config.env === 'development'){
        logger.error(`
        where: middlewares/error.middleware.ts  errorHandler if(config.env === 'developmenr'){}
        message: ${err}
        `);
    }

    res.status(statusCode).send(response);
}