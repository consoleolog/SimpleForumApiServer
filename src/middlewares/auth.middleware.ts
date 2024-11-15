import {VerifiedCallback} from "passport-jwt";
import {VerifyErrors} from "jsonwebtoken";
import {ApiError} from "../model/apiError";
import {errorDatas} from "../model/errorData";
import {Request, RequestHandler} from "express";
import {AccountDto} from "../model/account.dto";
import passport from "passport";


const verifyCallback =
    (req: Request, resolve: any, reject: any): VerifiedCallback =>
        async (err: Error, user: any | undefined, info: VerifyErrors) => {
            if (err || info || !user) return reject(new ApiError(401, errorDatas.UNAUTHORIZED));

            req.user = user as AccountDto;
            resolve();
};

export const authCheck: RequestHandler = async (req, res, next) => {
    new Promise( (resolve, reject)=> {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    })
        .then(()=>next())
        .catch((error)=>next(error));
}
