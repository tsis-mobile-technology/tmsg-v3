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
        this.socket.on("login", (name: string, type: string, status: number) => this.login(name, type, status));
        this.socket.on("logout", (name: string, type: string) => this.logout(name, type));
        this.socket.on("changestatus", (name: string, type: string, status: number) => this.changestatus(name, type, status));
        this.socket.on("alllist", () => this.alllist());
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
        console.log("UserSocket createUser");
        if (!this.users[user.nickname]) {
            console.log("UserSocket createUser:Creating namespace for room:", user.nickname);
            this.users[user.nickname] = new MessageSocket(this.io, user.nickname);
        }
        this.nsp.emit("create", user);        
    }

    // Login user(counselor, customer)
    private login(name: string, type: string, status: number): void {
        var status: number;
        status = 0;
        console.log("UserSocket login");
        console.log("UserSocket name:" + name);
        console.log("UserSocket type:" + type);
        console.log("UserSocket status:" + status);
        this.changeStatus(name, status);
    }

    // Logout user(counselor, customer)
    private logout(name: string, type: string): void {
        var status: number;
        status = -1;
        console.log("UserSocket login");
        console.log("UserSocket name:" + name);
        console.log("UserSocket type:" + type);
        console.log("UserSocket status:" + status);
        this.changeStatus(name, status);
    }

    // Chage status user(counselor, customer)
    private changestatus(name: string, type: string, status: number): void {
        console.log("UserSocket login");
        console.log("UserSocket name:" + name);
        console.log("UserSocket type:" + type);
        console.log("UserSocket status:" + status);
        this.changeStatus(name, status);
    }

    // Create a user
    private usercreate(name: string, type: string, pass: string): void {

        let bCheck = false;

        User.find({}).exec( (error: any, users: IUser[]) => {
            for (let user of users) {
                if(user.nickname == name) {
                    bCheck = true;
                }
            }
            if(bCheck == false) {
                User.create({
                    nickname: name, 
                    usertype: type, 
                    password: pass, 
                    created: new Date(), 
                    status: 0
                }, (error: any, user: IUser) => {
                    if (!error && user) {
                        console.log("user save success");
                        this.socket.emit("usercreate_result", "true");
                    }
                });
            } else {
                console.log("counselor is exist!");
                this.socket.emit("usercreate_result", "false");
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
    private alllist(): void {
        console.log("UserSocket alllist");
        User.find({}).exec( (error: any, users: IUser[]) => {
            for (let user of users) {
                console.log("UserSocket alllist:nickname:" + user.nickname);
                console.log("UserSocket alllist:usertype:" + user.usertype);
                console.log("UserSocket alllist:password:" + user.password);
                console.log("UserSocket alllist:status:" + user.status);
            }
            this.socket.emit("alllist_success", users);
        });
    }

    // List all rooms
    private changeStatus(name: string, status: number): void {
        console.log("UserSocket changeStatus");

        // save the user
        User.findOneAndUpdate({nickname: name}, {status: status}, function(err: any, user: IUser) {
            if (err) throw err;
            console.log('User successfully updated!(' + user.status + ")");
        });

        // User.find({nickname: name}).exec( (error: any, users: IUser[]) => {
        //     for (let user of users) {
        //         if( user.nickname === name ) {
        //             user.status = status;
        //         }
        //     }
        //     // this.socket.emit("user_success", users);
        // });
    }
}