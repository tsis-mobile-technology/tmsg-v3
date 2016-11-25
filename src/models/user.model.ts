import { IRoom } from "./";

export interface IUser {
    nickname: string;
    usertype: string; // type : "counselor",  "customer"
    created: Date;
    room: IRoom;
}