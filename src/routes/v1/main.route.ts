import { Router } from "express";
import {jwtCheck} from "../../middlewares/jwt.middleware";

const router = Router();

router.get('/', jwtCheck, (req, res, next) => {



    res.status(200).json("");
});


export default router;