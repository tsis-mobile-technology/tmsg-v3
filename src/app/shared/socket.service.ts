import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

import { IMessage, ISocketItem } from "../../models";

@Injectable()
export class SocketService {
    private name: string;
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    socket: SocketIOClient.Socket;

    constructor() {console.log("SocketService constructor");}

    // Get items observable
    get(name: string): Observable<any> {
        console.log("SocketService get, name:" + name);
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
            console.log("SocketService Observable.create");
            this.socket.on("create", (item: any) => observer.next({ action: "create", item: item }) );
            this.socket.on("usercreate", (item: any) => observer.next({ action: "usercreate", item: item }) );
            this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }) );
            return () => this.socket.close();
        });
    }

    // Create signal
    create(name: string) {
        console.log("SocketService create:" + name);
        this.socket.emit("create", name);
    }

    // Create signal
    usercreate(name: string, type: string, pass: string) {
        console.log("SocketService create:" + name);
        this.socket.emit("create", name, type, pass);
    }

    // Remove signal
    remove(name: string) {
        console.log("SocketService remove:" + name);
        this.socket.emit("remove", name);
    }

    // Handle connection opening
    private connect() {
        console.log("SocketService connect");
        console.log(`Connected to "${this.name}"`);

        // Request initial list when connected
        this.socket.emit("list");
    }

    // Handle connection closing
    private disconnect() {
        console.log("SocketService disconnect");
        console.log(`Disconnected from "${this.name}"`);
    }
}
