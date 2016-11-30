import * as mongoose from "mongoose";

export interface IUser {
    nickname: string;
    usertype: string; // type : "counselor",  "customer"
    password: string;
    created: Date;
    status: number;	// (0: 로그인, 1: 상담 중, 2: 대기, 3: 후처리, 4: 휴식)
}
export interface IUserModel extends IUser, mongoose.Document {}
 
export var UserSchema = new mongoose.Schema({
	nickname: String, 
	usertype: String,
	password: String,
	created: Date,
	status: Number
});

// var db = mongoose.createConnection('localhost', 'chat');

export var User = mongoose.model<IUserModel>("User", UserSchema);
