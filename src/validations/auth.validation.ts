import {RequestJoiSchema} from "./type";
import Joi from "joi";


export const register: RequestJoiSchema = Joi.object().keys({
    body: Joi.object().keys({
        accountId: Joi.string().required().description("사용자 아이디"),
        accountPw: Joi.string().required().description("사용자 비밀번호"),
    }).required(),

}).meta({ className: 'RegisterRequest' });

export const logout: RequestJoiSchema = Joi.object().keys({
    params: Joi.object().keys({
        accountId: Joi.string().required(),
    }).required()
}).meta({ className: 'LogoutRequest' });

export const refreshToken: RequestJoiSchema = Joi.object().keys({
    body: Joi.object().keys({
        refreshToken: Joi.string().required().description("refresh token")
    }).required()
}).meta({ className: 'RefreshTokenRequest' });

