import { Request , Response, NextFunction } from "express";
import {JwtUtil} from "../utils/jwt.util";
import {AccountDto} from "../model/account.dto";
import {CookieUtil} from "../utils/cookie.util";


export function jwtCheck(req: Request, res: Response, next: NextFunction) {

    const user = JwtUtil.extractToken(req.cookies.refresh_token);

    if (!user) {
        return res.status(401).json({})
    }

    CookieUtil.deleteCookie('access_token', res);

    const accessToken = JwtUtil.createAccessToken(user as AccountDto);

    CookieUtil.addCookie('access_token', accessToken, 60 * 60 * 1000, res);

    next();
}