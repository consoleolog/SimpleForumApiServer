import {ObjectId} from "mongodb";

export interface AccountDto {
    _id: ObjectId;
    accountId: string
    accountPw: string
}