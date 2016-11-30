import * as mongoose from "mongoose";

export interface IChatList {
    from: string;
    to: string;
    message: string;
    created: Date;
}

export interface IChatHistory {
    nickname: string;
    chatlists: IChatList[];
    status: number;
    terminated: Date;
}

export interface IChatHistoryModel extends IChatHistory, IChatList, mongoose.Document {}
 
export var ChatHistorySchema = new mongoose.Schema({
    nickname: String,
    chatlists: [{from: String, to: String, message: String, created: Date}],
    status: Number,
    terminated: Date
});

export var ChatHistory = mongoose.model<IChatHistoryModel>("ChatHistory", ChatHistorySchema);
