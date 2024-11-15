import { Router } from "express";
import { AccountDto } from "../../model/account.dto";
import { connectDB } from "../../config/database";
import { Db } from "mongodb";
import bcrypt from "bcrypt";

const router = Router();

let db: Db;

connectDB.then((client)=>{
    db = client.db('simple-forum');
})

router.post('/register', async (req, res, next) => {

    const accountDto = req.body as AccountDto;

    let hashPw = await bcrypt.hash(accountDto.accountPw, 10);

    const result = await db.collection('account').insertOne({
        accountId: accountDto.accountId,
        accountPw: hashPw
    });

    if (!result) res.status(500).json("error");

    res.status(201).json("success");
});


export default router;