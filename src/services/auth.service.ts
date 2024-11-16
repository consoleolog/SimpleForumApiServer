import {Db, MongoClient} from "mongodb";
import {connectDB} from "../config/database";
import config from "../config/config";
import {AccountDto} from "../model/account.dto";
import logger from "../config/logger";
import {ApiResponse} from "../model/apiResponse";
import {responseDatas} from "../model/responseData";
import bcrypt from "bcrypt";

export class AuthService {

    private db: Db | undefined;

    constructor(connection: Promise<MongoClient>) {
        connection.then((client) => {
            this.db = client.db(config.db.database);
        });
    }

    register = async (accountDto: AccountDto) => {
        logger.info(accountDto);
        if (this.db === undefined) return ;
        try {

            const account = await this.db.collection("account").findOne({accountId: accountDto.accountId});
            if (account) return new ApiResponse(202, responseDatas.ACCEPTED);

            await this.db.collection("account").insertOne({
                accountId: accountDto.accountId,
                accountPw: bcrypt.hash(accountDto.accountPw, 10),
            });

            return new ApiResponse(201, responseDatas.CREATED);
        } catch (error){
            logger.error(`
        where: services/auth.service.ts
        message: ${error}
        `);
        }
    }

}
