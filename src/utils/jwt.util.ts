import jwt from "jsonwebtoken";
import {AccountDto} from "../model/account.dto";
import logger from "../config/logger";
import {Db, ObjectId} from "mongodb";
import {connectDB} from "../config/database";
import dotenv from "dotenv";

dotenv.config();

let db: Db;

connectDB.then((client)=>{
    db = client.db('simple-forum');
});

export class JwtUtil {


    static createRefreshToken( user: AccountDto ){
        return jwt.sign({
            id: user._id,
            accountId: user.accountId
        }, "jwtjwtjwtjwtjwtjwtjwtjwtjwt", {
            algorithm: "HS256",
            expiresIn: "1d"
        });
    }

    static createAccessToken( user: AccountDto ) {
        return jwt.sign({
            id: user._id,
            accountId: user.accountId,
        }, "jwtjwtjwtjwtjwtjwtjwtjwtjwt", {
            algorithm: "HS256",
            expiresIn: '1h',
        });
    }

    static extractToken(token: string) {
        if (!token) return false;

        try {
            jwt.verify(token, "jwtjwtjwtjwtjwtjwtjwtjwtjwt");
            return jwt.decode(token);
        } catch (error) {
            logger.error(error);
            return false;
        }
    }


}