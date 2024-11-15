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