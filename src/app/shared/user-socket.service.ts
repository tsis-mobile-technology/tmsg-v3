import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

import { IMessage, ISocketItem, IUser } from "../../models";

@Injectable()
export class UserSocketService {
    private name: string;
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    socket: SocketIOClient.Socket;

    constructor() {console.log("UserSocketService constructor");}

    // Get items observable
    get(name: string): Observable<any> {
        console.log("UserSocketService get, name:" + name);
        this.name = name;
        let socketUrl = this.host + "/" + this.name;
        this.socket = io.connect(socketUrl);
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });
        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable.create((observer: any) => {
            console.log("UserSocketService Observable.create");
            this.socket.on("create", (item: any) => observer.next({ action: "create", item: item }) );
            this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }) );
            this.socket.on("usercreate", (name: string, type: string, pass: string) => this.usercreate(name, type, pass));
            this.socket.on("login", (name: string, type: string, status: number) => this.login(name, type, status));
            this.socket.on("userlist", (item: any) => observer.next({ action: "userlist", item: item }) );
            return () => this.socket.close();
        });
    }

    // Create signal
    create(name: string) {
        console.log("UserSocketService create:" + name);
        this.socket.emit("create", name);
    }

    // Create signal
    usercreate(name: string, type: string, pass: string) {
        console.log("UserSocketService usercreate:" + name);
        this.socket.emit("usercreate", name, type, pass);
    }

    // Create signal
    login(name: string, type: string, status: number) {
        console.log("UserSocketService login:" + name);
        this.socket.emit("login", name, type, status);
    }

    // Create signal
    userlist(): Observable<any> {
        console.log("UserSocketService userlist");
        this.socket.emit("alllist");

        return Observable.create((observer: any) => {
            this.socket.on("alllist_success", (data) => observer.next(data) );
        });
        // this.socket.on('alllist_succeed', function(data){
        // //... handle message from server ...
        //     console.log("UserSocketService userlist:data:" + data);
        //     for (let user of data) {
        //         console.log("UserSocket alllist:nickname:" + user.nickname);
        //         console.log("UserSocket alllist:usertype:" + user.usertype);
        //         console.log("UserSocket alllist:password:" + user.password);
        //     }
        //     return data;
        // });
        // return [];
    }

    // Remove signal
    remove(name: string) {
        console.log("UserSocketService remove:" + name);
        this.socket.emit("remove", name);
    }

    // Handle connection opening
    private connect() {
        console.log("UserSocketService connect");
        console.log(`Connected to "${this.name}"`);

        // Request initial list when connected
        this.socket.emit("list"); // /server/socket으로 list를 호출(분출)한다.user.ts, room.ts, message.ts 
    }

    // Handle connection closing
    private disconnect() {
        console.log("UserSocketService disconnect");
        console.log(`Disconnected from "${this.name}"`);
    }
}
