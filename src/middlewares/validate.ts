import {RequestJoiSchema} from "../validations/type";
import {NextFunction, RequestHandler} from "express";
import {CommonUtil} from "../utils/common.util";
import Joi from "joi";
import logger from "../config/logger";
import {ApiError} from "../model/apiError";

import {errorDatas} from "../model/errorData";


export default ( schema: RequestJoiSchema ): RequestHandler => (req, res, next: NextFunction) => {

    const object = CommonUtil.pick(req, ['params', 'query', 'body']);

    const { value, error } = schema.prefs({ errors: {label: 'key'} }).validate(object, { allowUnknown: true }) as {
        value: typeof object;
        error?: Joi.ValidationError | undefined;
    };

    if (error){

        const errorMessage = error.details[0].message;

        logger.error(`
        where: middlewares/validate.ts schema.prefs()
        message: ${errorMessage}
        `);
        return next(new ApiError(400, {...errorDatas.INPUT_VALIDATION_ERROR, message: errorMessage}))

    }
    Object.assign(req, value);
    return next();
};