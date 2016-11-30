import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { List } from "immutable";

import { SocketService } from "./socket.service";

import { IRoom, IUser, User, ISocketItem } from "../../models";

@Injectable()
export class UserService {
    nickname: string = "";
    usertype: string = "";
    password: string = "";
    status: number;    // (0: 로그인, 1: 상담 중, 2: 대기, 3: 후처리, 4: 휴식, 5: 상담실 입장(customer))
    rooms: IRoom[] = [];
    users: ReplaySubject<any> = new ReplaySubject(1);
    private list: List<any> = List();

    constructor(private socketService: SocketService) {
        console.log("UserService constructor here?");
        this.socketService
            .get("users")
            .subscribe(
                (socketItem: ISocketItem) => {
                    let user: IUser = socketItem.item;
                    let index: number = this.findIndex(user.nickname);
                    if (socketItem.action === "remove") {
                        // Remove
                        this.list = this.list.delete(index);
                    } else {
                        if (index === -1) {
                            // Create
                            user.status = 0; // 생성
                            this.list = this.list.push(user);
                        } else {
                            // Update
                            this.list = this.list.set(index, user);
                        }
                    }
                    this.users.next(this.list);
                }, error => {console.log(error);},
                () => {console.log("completed");}
            );
    }

    // Create user
    create(name: string, pass: string, type: string, datetime: Date) {
        console.log("UserService create :" + name + "," + pass + "," + type + "," + datetime);
        this.socketService.usercreate(name, pass, type);
    }

    // Remove user
    remove(name: string) {
        console.log("UserService remove");
        // Send signal to remove the user
        this.socketService.remove(name);
    }

    // Remove user
    getlist() {
        console.log("UserService remove");
        // Send signal to remove the user
        this.list;
    }

    login(nickname: string, usertype: string, created: Date): void {
        let index: number = this.findIndex(nickname);
        let status: number = 0;
        if (index === -1) {
            // Create
            this.nickname = nickname;
            this.usertype = usertype;
            this.status = status;
        }
    }

    logout(nickname: string): void {
        let index: number = this.findIndex(nickname);
        if (index === -1) {
            // Create
            console.log("UserService delete: not found");
        } else {
            // exist nickname
            this.list.delete(index);
            this.nickname = "";
        }
    }

    // Find matching user
    private findIndex(name: string): number {
        return this.list.findIndex((user: IUser) => {
            return user.nickname === name;
        });
    }

}