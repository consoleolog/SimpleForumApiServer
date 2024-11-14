import {Server} from "node:http";


import app from "./app";
import logger from "./config/logger";


let server: Server;

server = app.listen(3000, ()=>{
    logger.info(`Listening to port 3000`);
    logger.info(`http://localhost:3000/v1`);
});