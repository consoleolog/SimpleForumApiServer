import config from "../config/config";
import definitions from "./definitions";
import components from "./components";
import {swAuthRouter} from "../routes/v1/auth.route";


export default {
    openapi: '3.0.0',
    info: {
        title: "Express의 정석",
        version: "0.1.0",
        description: "Express의 정석 swagger docs",
        license: {
            name: "MIT",
            url: ""
        },
        contact: {
            name: "leo",
            url: "",
            email: "leopportunity5@gmail.com",
        }
    },
    servers: [{
        url: `https://localhost:${config.port}`,
    }],
    paths: { ...swAuthRouter },
    definitions,
    components,
}