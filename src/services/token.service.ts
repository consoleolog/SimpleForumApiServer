import {AccountDto} from "../model/account.dto";
import moment from "moment";
import {TokenType} from "../model/jwtPayload.dto";
import config from "../config/config";
import {JwtPayload} from "../model/jwtPayload.dto";
import jwt from "jsonwebtoken";

const generateToken = (account: AccountDto, expireAt: moment.Moment, type: TokenType, secret = config.jwt.secret) => {
    const payload: JwtPayload = {
        sub: account.accountId,
        iat: moment().unix(),
        exp: expireAt.unix(),
        type,
    };
    return jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: expireAt.unix(),
    });
}


export {}