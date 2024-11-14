import { Router } from "express";
import { connectDB } from "../../config/database";
import { Db } from "mongodb";
import passport from "passport";

const router = Router();

let db: Db;

connectDB.then((cleint)=>{
    db = cleint.db('simple-forum');
})

router.post('/login', async (req, res, next) => {

    passport.authenticate('local',(error: any, user: any, info: any)=>{
        console.log(user);
        console.log(info);
        if (error) return res.status(500).json(error);
        
        if (!user) return res.status(401).json(info.message);

        req.logIn(user, (err) => {
            if (err) return next(error);

            res.redirect('http://localhost:3000');
        });
    })(req, res, next);

    
    res.redirect('http://localhost:3000');
});


export default router;