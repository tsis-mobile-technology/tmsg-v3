import { Injectable } from "@angular/core";
import { ReplaySubject, Observable, BehaviorSubject } from "rxjs";
import { List } from "immutable";

import { UserSocketService } from "./user-socket.service";

import { IRoom, IUser, User, ISocketItem } from "../../models";

@Injectable()
export class UserService {
    nickname: string = "";
    usertype: string = "";
    password: string = "";
    status: number;    // (0: 로그인, 1: 상담 중, 2: 대기, 3: 후처리, 4: 휴식, 5: 상담실 입장(customer))
    rooms: IRoom[] = [];
    users: Observable<IUser[]>;
    private _users: BehaviorSubject<IUser[]>;
    // data observe 처리 : https://coryrylan.com/blog/angular-2-observable-data-services
    private dataStore: {
        users: IUser[]
    };

    lists: ReplaySubject<any> = new ReplaySubject(1);
    private list: List<any> = List();

    constructor(private userSocketService: UserSocketService) {
        console.log("UserService constructor here?");
        this._users = <BehaviorSubject<IUser[]>>new BehaviorSubject([]);
        this.dataStore = { users: [] };
        this.users = this._users.asObservable();

        this.userSocketService
            .get("users")
            .subscribe(
                (socketItem: ISocketItem) => {
                    let user: IUser = socketItem.item;
                    let index: number = this.findIndex(user.nickname);
                    console.log("UserService constructor: socketItem.action:" + socketItem.action + ",index:" + index);
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
                    this.lists.next(this.list);
                }, error => {console.log(error);},
                () => {console.log("completed");}
            );
    }

    // Create user
    create(name: string, pass: string, type: string, datetime: Date) {
        console.log("UserService create :" + name + "," + pass + "," + type + "," + datetime);
        this.userSocketService.usercreate(name, type, pass);
        // users data refresh
        this.userlist();
    }

    // Remove user
    remove(name: string) {
        console.log("UserService remove");
        // Send signal to remove the user
        this.userSocketService.remove(name);
        // users data refresh
        this.userlist();
    }

    // get user list
    userlist(): void {
        console.log("UserService userlist");
        // Send signal to remove the user
        // this.userSocketService.userlist();
        this.userSocketService
            .userlist()
            .subscribe(
                (data) => {
                    console.log("UserService userlist: data:" + data);
                    this.dataStore.users = data;
                    this._users.next(Object.assign({}, this.dataStore).users);
                }, error => {console.log(error);},
                () => {console.log("completed");}
            );
    }

    login(nickname: string, usertype: string, password: string, created: Date): boolean {
        console.log("UserService login");
        let index: number = this.findIndex(nickname);
        let status: number = 0;
        let rtn: boolean = false;

        if(usertype == "customer") {
            this.userSocketService.create(nickname);
            this.nickname = nickname;
            this.usertype = usertype;
            this.status = status;
        } else {
            if (index === -1) {
                console.log("UserService Not found User counselor");
            }
            else {
                // compare password
                let user: IUser = this.list.get(index);
                if( user.password === password) {
                    // login success
                    this.nickname = nickname;
                    this.usertype = usertype;
                    this.status = status;
                    rtn = true;
                    this.userSocketService.login(this.nickname, this.usertype, this.status);
                } else {
                    // login failure
                    console.log("UserService login faileure!! password check");
                    console.log("UserService exist user:pwd:" + user.password);
                    rtn = false;
                }
            }
        }

        return rtn;
    }

    logout(nickname: string): void {
        let index: number = this.findIndex(nickname);
        if (index === -1) {
            // Create
            console.log("UserService delete: not found");
        } else {
            this.userSocketService.logout(nickname, this.usertype);
            // exist nickname
            this.list.delete(index);
            this.nickname = "";
        }
    }

    changeStatus(status: number): void {
        this.status = status;

        if (this.nickname && this.nickname === null) {
            // Create
            console.log("UserService changeStatus: not found");
        } else {
            this.userSocketService.changestatus(this.nickname, this.usertype, status);
        }
    }

    // Find matching user
    private findIndex(name: string): number {
        return this.list.findIndex((user: IUser) => {
            return user.nickname === name;
        });
    }

}