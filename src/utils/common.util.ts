import logger from "../config/logger";

type CustomObj = {
    [key: string]: any;
}

export class CommonUtil {

    static pick(object: CustomObj, keys: Array<string>):CustomObj {
        return keys.reduce((obj: CustomObj, key: string): CustomObj => {
            if (key in object) {
                obj[key] = object[key];
            }
            return obj;
        }, {});
    }

    static isEmpty = (value: any): boolean => typeof value == undefined || value == '' || value == null || value.length == 0;


}

export function printError(dir = __dirname, location:string ,errorMsg: string){
    logger.error(`
    file path: ${dir}
    location: ${location}
    errorMsg: ${errorMsg} 
    `);
}