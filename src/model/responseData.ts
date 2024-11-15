export type ResponseData = {
    name: string;
    responseCode: responseType;
    message: string;
}


type responseType =
    | 'OK'
    | 'CREATED'
    | 'ACCEPTED'
    | 'NO_CONTENT'
    | 'UNASSIGNED'
    | 'MOVED_PERMANENTLY'

export const responseDatas: { [key in responseType]: ResponseData } = {
    OK: {
        name: 'Success',
        responseCode: 'OK',
        message: 'Ok',
    },
    CREATED: {
        name: 'Success',
        responseCode: 'CREATED',
        message: 'Created'
    },
    ACCEPTED: {
        name: 'Success',
        responseCode: 'ACCEPTED',
        message: 'Accepted'
    },
    UNASSIGNED: {
        name: 'Unassigned',
        responseCode: 'UNASSIGNED',
        message: 'Unassigned'
    },
    NO_CONTENT: {
        name: 'Success',
        responseCode: 'NO_CONTENT',
        message: 'No Content',
    },
    MOVED_PERMANENTLY: {
        name: 'Success',
        responseCode: 'MOVED_PERMANENTLY',
        message: 'Moved Permanently',
    }


}
