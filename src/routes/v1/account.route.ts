import { Router } from "express";
import { AccountDto } from "../../model/account.dto";
import { connectDB } from "../../config/database";
import { Db } from "mongodb";

const router = Router();

let db: Db;

connectDB.then((cleint)=>{
    db = cleint.db('simple-forum');
})

router.post('/register', async (req, res, next) => {

    const accountDto = req.body as AccountDto;

    console.log(accountDto);

    db.collection('account').insertOne({
        accountId: accountDto.accountId,
        accountPw: accountDto.accountPw
    });
    
    res.redirect('http://localhost:3000');
});


export default router;