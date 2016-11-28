import * as mongoose from "mongoose";

export interface IRoom {
    name: string;
    created: Date;
    status: number; // 0: 생성, 1: 고객입장, 2: 상담사 입장, 3: 상담사 퇴장, 4: 고객 퇴장, 5: 종료
}

export interface IRoomModel extends IRoom, mongoose.Document {}
 
export var RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    created: Date
});

export var Room = mongoose.model<IRoomModel>("Room", RoomSchema);
