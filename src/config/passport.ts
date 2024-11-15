import {Db, ObjectId} from "mongodb";
import { Strategy as LocalStrategy } from "passport-local";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import { connectDB } from "./database";
import passport from "passport";
import logger from "./logger";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


let db: Db;

connectDB.then((client)=>{
    db = client.db('simple-forum');
})

const SECRET_KEY = 'your_secret_key'; // 실제 프로젝트에서는 환경 변수에 저장하세요.

// JWT 전략 설정
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    console.log(payload)
    console.log(done)
    // try {
    //     const user = await db.collection('account').findOne({ _id: new ObjectId(payload.id) });
    //     if (user) {
    //         delete user.accountPw;  // 민감한 정보 삭제
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //     }
    // } catch (error) {
    //     return done(error, false);
    // }
});



const localStrategy = new LocalStrategy({
    usernameField: "accountId",
    passwordField: "accountPw",
    session: false,
}, async (userId, userPw, cb)=>{

    let result = await db.collection('account').findOne({
        accountId: userId
    });

    if (!result) return cb(null, false, { message: 'NOT FOUND ACCOUNT' });

    if (  await bcrypt.compare(userPw, result.accountPw) ){
        return cb(null, result);
    } else {
        return cb(null, false, { message: 'INCORRECT PASSWORD' })
    }
});


export { localStrategy, jwtStrategy };