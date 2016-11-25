import { IRoom } from "./";

export interface IUser {
    nickname: string;
    usertype: string; // type : "counselor",  "customer"
    created: Date;
    room: IRoom;
    status: number;	// (0: 로그인, 1: 상담 중, 2: 대기, 3: 후처리, 4: 휴식)
}