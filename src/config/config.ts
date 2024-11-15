import dotenv from "dotenv";
import path from 'path';
import Joi, {valid} from "joi";
import logger from "./logger";

export type NodeEnv = "development" | "production" | "test";

type configSchema = {
    env: NodeEnv;
    port: number;
    swaggerAuth: {
        id: string,
        password: string
    };
    db: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    jwt: {
        secret: string;
        accessExpireMinutes: number;
        refreshExpireDays: number;
    };
};


type envSchema = {
    NODE_ENV: string;
    PORT: number;

    DB: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PWD: string;
    DB_NAME: string;

    SW_ID: string;
    SW_PWD: string;

    JWT_SECRET: string;
    JWT_ACCESS_EXPIRE_MINUTES:number;
    JWT_REFRESH_EXPIRE_MINUTES:number;
};

dotenv.config({ path: path.join(__dirname, "../../dev.env") });

const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid("development", "production", "test").required(),
    PORT: Joi.number().integer().default(8080),

    DB: Joi.string().example("postgres"),
    DB_HOST: Joi.string().default("localhost"),
    DB_PORT: Joi.number().example(5432),
    DB_USER: Joi.string().example("postgres"),
    DB_PWD: Joi.string().required(),

    SW_ID: Joi.string().default("id"),
    SW_PWD: Joi.string().description("password"),

    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRE_MINUTES: Joi.number().default(30),
    JWT_REFRESH_EXPIRE_DAYS: Joi.number().default(1),

})  /* Schema 에 지정되지 않은 키도 허용 */
    .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env) as {
        value: envSchema;
        error: Joi.ValidationError | undefined;
};

if (error){
    logger.error(error);
    throw new Error(`location: config/config  
                     where: envVarsSchema.prefs Error: ${error} 
                     `);
}

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    swaggerAuth: {
        id: envVars.SW_ID,
        password: envVars.SW_PWD,
    },
    db: {
        type: envVars.DB,
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        username: envVars.DB_USER,
        password: envVars.DB_PWD,
        database: envVars.DB_NAME,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpireMinutes: envVars.JWT_ACCESS_EXPIRE_MINUTES,
        refreshExpireDays: envVars.JWT_REFRESH_EXPIRE_MINUTES,
    },
} as configSchema;