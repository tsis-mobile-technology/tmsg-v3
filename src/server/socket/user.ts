import { IUser, User } from "../../models";

import { MessageSocket } from "./message";

export class UserSocket {
    nsp: any;
    name: string;
    data: any;
    socket: any;
    users: any = {};

    constructor(private io: any) {
        console.log("UserSocket constructor");
        this.nsp = this.io.of("/users");
        this.nsp.on("connection", (socket: any) => {
            console.log("Client connected");
            this.socket = socket;
            this.listen();
        });
    }

    // Add signal
    private listen(): void {
        console.log("UserSocket listen");
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("usercreate", (name: string, type: string, pass: string) => this.usercreate(name, type, pass));
        this.socket.on("alllist", (name: string, type: string, pass: string) => this.alllist());
        this.socket.on("remove", (name: string) => this.remove(name));
        this.socket.on("list", () => this.list());
    }

    // Handle disconnect
    private disconnect(): void {
        console.log("UserSocket disconnect");
        console.log("Client disconnected");
    }

    // Create room and emit it
    private createUser(user: IUser): void {
        console.log("UserSocket createRoom");
        if (!this.users[user.nickname]) {
            console.log("Creating namespace for room:", user.nickname);
            this.users[user.nickname] = new MessageSocket(this.io, user.nickname);
        }
        this.nsp.emit("create", user);        
    }

    // Create a user
    private usercreate(name: string, type: string, pass: string): void {
        console.log("UserSocket usercreate");

        User.create({
            nickname: name, 
            usertype: type, 
            password: pass, 
            created: new Date(), 
            status: 0
        }, (error: any, user: IUser) => {
            if (!error && user) {
                console.log("user save success");
            }
        });
    }

    // Remove a room
    private remove(name: string): void {
        console.log("UserSocket remove");

        // Remove room
        User.remove({
            nickname: name
        }).exec( (error: any, user: IUser) => {
            if (!error && user) {
                this.nsp.emit("remove", user);
            }
        });
    }

    // List all rooms
    private list(): void {
        console.log("UserSocket list");
        if (this.socket && this.socket.connected) {
            User.find({}).exec( (error: any, users: IUser[]) => {
                for (let user of users) {
                    console.log("UserSocket list:nickname:" + user.nickname);
                    this.createUser(user);
                }
            });
        }
    }

    // List all rooms
    private alllist(): IUser[] {
        console.log("UserSocket alllist");
        let users: IUser[] = [];
        User.find({}).exec( (error: any, users: IUser[]) => {
            for (let user of users) {
                console.log("UserSocket alllist:nickname:" + user.nickname);
            }
            this.users = users;
        });
        console.log("UserSocket alllist:" + this.users);
        return this.users;
    }
}