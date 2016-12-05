import { IUser, User } from "../../models";
import { MessageSocket } from "./message";

export class KakaoSocket {
    nsp: any;
    name: string;
    data: any;
    socket: any;
    users: any = {};

    constructor(private io: any) {
        console.log("KakaoSocket constructor");
        this.nsp = this.io.of("/");
        this.nsp.on("connection", (socket: any) => {
            console.log("Client connected");
            this.socket = socket;
            this.listen();
        });
    }

    // Add signal
    private listen(): void {
        console.log("KakaoSocket listen");
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("keyboard", () => this.keyboard());
    }

    // Handel keyboard
    private keyboard(): void {
        console.log("KakaoSocket listen");
        let result: any = {type:'text'};

        this.socket.emit("keyboard", result);
    }

    // Handle disconnect
    private disconnect(): void {
        console.log("RoomSocket disconnect");
        console.log("Client disconnected");
    }
}