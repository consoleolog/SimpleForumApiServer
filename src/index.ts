import app from "./app";
import logger from "./config/logger";
import {connectDB} from "./config/database";
import * as http from "node:http";
import config from "./config/config";

let server: http.Server;

let db;

connectDB.then((client) => {
    logger.info('DB connected Success');


    db = client.db(config.db.database);
    
    // DB 연결 확인
    if (!db) {
        logger.error('DB connection failed');
        process.exit(1); // DB 연결 실패 시 앱 종료
    }

    server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
        logger.info(`http://localhost:8080/v1`);
    });

}).catch((error) => {
    logger.error(`DB connect error: ${error}`);
    process.exit(1); // DB 연결 실패 시 앱 종료
});

