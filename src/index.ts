import {Server} from "node:http";


import app from "./app";
import logger from "./config/logger";
import { MongoClient } from "mongodb";


let server: Server;

const uri = "mongodb+srv://admin:mongodb!123@cluster0.1o0bw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let db;

new MongoClient(uri).connect().then((client) => {
    logger.info('DB connected Success');

    db = client.db('simple-forum');
    
    // DB 연결 확인
    if (!db) {
        logger.error('DB connection failed');
        process.exit(1); // DB 연결 실패 시 앱 종료
    }

    server = app.listen(8080, () => {
        logger.info(`Listening to port 8080`);
        logger.info(`http://localhost:8080/v1`);
    });
}).catch((error) => {
    logger.error(`DB connect error: ${error}`);
    process.exit(1); // DB 연결 실패 시 앱 종료
});

