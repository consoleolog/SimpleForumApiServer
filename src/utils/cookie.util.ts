import {Response} from "express";

export class CookieUtil {

    static addCookie(name: string, token: string, expireTime: number, res: Response) {
        res.cookie(name, token, {
            path: "/",
            httpOnly: true,
            secure: true,
            maxAge: expireTime,
        });
    }

    static deleteCookie(name:string, res: Response){
        res.cookie(name,"", {
            path: "/",
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        });
    }

}