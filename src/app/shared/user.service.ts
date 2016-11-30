import { Injectable } from "@angular/core";

import { List } from "immutable";

import { IRoom, IUser, User } from "../../models";

@Injectable()
export class UserService {
    nickname: string = "";
    usertype: string = "";
    password: string = "";
    status: number;    // (0: 로그인, 1: 상담 중, 2: 대기, 3: 후처리, 4: 휴식, 5: 상담실 입장(customer))
    room: IRoom;

    rooms: IRoom[] = [];
	user: IUser;
	private existUser: IUser;

	private lists: List<any> = List();

    constructor() {
    	console.log("UserService constructor");
        // let inickname: string = "";
        // let iusertype: string = "";
        // let icreated: Date;
        // let irooms: IRoom[] = [];
        let iuser: IUser; 
        this.user === iuser;
        let iroom: IRoom; 
        this.room === iroom;
    }

    save(name: string, pass: string, type: string, datetime: Date) {
        console.log("UserService save :" + name + "," + pass + "," + type + "," + datetime);
    
        // let user = new User({nickname: name, usertype: type, password: pass, created: datetime, status: 0});
        // user.save(function(err) {
        //     if( err ) return this.handleError(err);
        // })
    }

    login(nickname: string, usertype: string, created: Date): void {
        console.log("UserService login nickname:" + nickname);
        console.log("UserService login usertype:" + usertype);

        let index: number = this.findIndex(nickname);
        console.log("UserService login index:" + index);
        let room: IRoom;
        let status: number = 0;
        let password: string = "";
        if (index === -1) {
            // Create
            this.user = {nickname, usertype, password, created, status};
            // this.user.nickname = nickname;
            this.nickname = nickname;
            this.usertype = usertype;
            this.status = status;
            // this.user.usertype = usertype;
            // this.user.created = created;
            this.lists = this.lists.push(this.user);
        } else {
            // exist nickname
            this.lists.get(index, this.existUser);
			console.log("UserService save");
            console.log("IUser nickname:" + this.existUser.nickname);
            console.log("IUser usertype:" + this.existUser.usertype);
            console.log("IUser created:" + this.existUser.created);
            this.nickname = this.existUser.nickname;
            this.usertype = this.existUser.usertype;
            this.status = 0;
        }
    }

    delete(user: IUser): void {
        let index: number = this.findIndex(user.nickname);
        if (index === -1) {
            // Create
            console.log("UserService delete: not found");
        } else {
            // exist nickname
            this.lists.delete(index);
            this.nickname = "";
        }
    }

    // Find matching room
    private findIndex(name: string): number {
        return this.lists.findIndex((user: IUser) => {
            return user.nickname === name;
        });
    }

    private handleError(err) {
        console.log("UserService handleError");
        console.log(`Connected to "${err}"`);
        //http://stackoverflow.com/questions/34513558/angular-2-0-and-modal-dialog
    }
}