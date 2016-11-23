import { Injectable } from "@angular/core";

import { List } from "immutable";

import { IRoom, IUser } from "../../models";

@Injectable()
export class UserService {
    nickname: string = "";
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
    }

    save(nickname: string, usertype: string, created: Date): void {
        console.log("UserService save nickname:" + nickname);
        console.log("UserService save usertype:" + usertype);

        let index: number = this.findIndex(nickname);
        console.log("UserService save index:" + index);
        let rooms: IRoom[] = [];
        if (index === -1) {
            // Create
            this.user = {nickname, usertype, created, rooms};
            // this.user.nickname = nickname;
            this.nickname = nickname;
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
            console.log("IUser rooms:" + this.existUser.rooms);
            this.nickname = this.existUser.nickname;
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
        }
    }

    // Find matching room
    private findIndex(name: string): number {
        return this.lists.findIndex((user: IUser) => {
            return user.nickname === name;
        });
    }
}