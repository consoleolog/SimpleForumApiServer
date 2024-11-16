import { Db } from "mongodb";
import { connectDB } from "../config/database";
import { AccountDto } from "../model/account.dto";
import { AuthService } from "../services/auth.service";
import config from "../config/config";
import logger from "../config/logger";

describe('authServiceTest', () => {
    

    test('register test', async () => {
        let db: Db;

        connectDB.then((client)=>{
            logger.info("connect sucess")
            db = client.db(config.db.database);
        });


    });
});
