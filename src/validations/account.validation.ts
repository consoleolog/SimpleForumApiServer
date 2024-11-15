import {RequestJoiSchema} from "./type";
import Joi from "joi";


export const getAccount: RequestJoiSchema = Joi.object().keys({
    params: Joi.object().keys({
        accountId: Joi.string().required(),
    }).required()
}).meta({ className: 'Get Account Request' });

export const getAccounts: RequestJoiSchema = Joi.object().keys({
    query: Joi.object().keys({
        limit: Joi.number().min(0).required(),
        from: Joi.number().default(0),
    }).required()
}).meta({ className: 'Get Accounts Request' });