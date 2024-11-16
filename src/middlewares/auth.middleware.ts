import {VerifiedCallback} from "passport-jwt";
import {VerifyErrors} from "jsonwebtoken";
import {ApiError} from "../model/apiError";
import {errorDatas} from "../model/errorData";
import {Request, RequestHandler} from "express";
import {AccountDto} from "../model/account.dto";
import passport from "passport";


export const authCheck: RequestHandler = async (req, res, next) => {
    new Promise( (resolve, reject)=> {
        passport.authenticate('jwt', { session: false }, (req: Request, resolve:any, reject:any)=> 
            async (err: Error, user: any | undefined, info: VerifyErrors) => {
                if (err || info || !user) return reject(new ApiError(401, errorDatas.UNAUTHORIZED));
    
                req.user = user as AccountDto;
                resolve();
            }
        )(req, res, next);
    })
        .then(()=>next())
        .catch((error)=>next(error));
}
