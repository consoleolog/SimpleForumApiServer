import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";


const { combine, timestamp, label, printf } = winston.format;

const logDir = `${process.cwd()}/logs`;

const customFormat = winston.format.printf(({ level, message, label ,timestamp}) => {
    return `[${level}] ${timestamp} :: ${label} :: ${message}`;
});

const logger =  winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',

    format: combine(
        label({label: 'Express Api Server' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
    ),

    transports: [

        new winstonDaily({
            level: 'INFO',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'ERROR',
            datePattern: 'YYYY-MM-DD',
            dirname: `${logDir}/error`,
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],

    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add( new winston.transports.Console({
            format: combine(
                label({label: 'Express Api Server' }),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                customFormat
            ),
        }),
    )
}

export default logger;