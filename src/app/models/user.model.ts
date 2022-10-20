import { MessageModel } from "./message.model";

export class UserModel{
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: number;
    panNumber: string;
    address: string;
    email: string;
    password: string;
    memberID: number;
    messageModel: MessageModel;
    _token: string;

    get token() {
        return this._token;
    }
}