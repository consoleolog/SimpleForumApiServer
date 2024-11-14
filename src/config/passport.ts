import { Db } from "mongodb";
import { Strategy as LocalStrategy } from "passport-local";
import { connectDB } from "./database";


let db: Db;

connectDB.then((cleint)=>{
    db = cleint.db('simple-forum');
})

const localStrategy = new LocalStrategy( async (userId, userPw, cb)=>{
    console.log(userId)
    console.log(userPw)

    let result = await db.collection('account').findOne({
        accountId: userId
    });
    if (!result) return cb(null, false, {message: 'NOT FOUND ACCOUNT'});
    
    if (result.password === userPw){
        return cb(null, result);
    } else {
        return cb(null, false, { message: 'INCORRECT PASSWORD' })
    }
});

export default localStrategy;