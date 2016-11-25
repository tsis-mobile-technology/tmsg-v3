import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { List } from "immutable";

import { SocketService } from "./socket.service";
import { UserService } from "./user.service";

import { IRoom, ISocketItem } from "../../models";

@Injectable()
export class RoomService {
    rooms: ReplaySubject<any> = new ReplaySubject(1);
    private list: List<any> = List();

    constructor(
        private socketService: SocketService,
        private userService: UserService
    ) {
        console.log("RoomService constructor");
        this.socketService
            .get("room")
            .subscribe(
                (socketItem: ISocketItem) => {
                    let room: IRoom = socketItem.item;
                    let index: number = this.findIndex(room.name);
                    if (socketItem.action === "remove") {
                        // Remove
                        this.list = this.list.delete(index);
                    } else {
                        if (index === -1) {
                            // Create
                            room.status = 0; // 생성
                            this.list = this.list.push(room);
                        } else {
                            // Update
                            this.list = this.list.set(index, room);
                        }
                    }
                    this.rooms.next(this.list);

                    //directory join chatroom & wait counselor
                    if( this.userService.usertype == "customer") {
                        this.userService.room = this.directJoin(this.userService.nickname);    
                    }
                    console.log("RoomService constructor userService:" + this.userService.room);
                },
                error => console.log(error)
            );
    }

    // Join room
    join(name: string): void {
        console.log("RoomService join");
        for (let roomIndex in this.userService.rooms) {
            let room = this.userService.rooms[roomIndex];
            if (room.name === name) {
                // status control
                this.userService.status = 5;
                return;
            }
        }
        let index = this.findIndex(name);
        if (index !== -1) {
            let room = this.list.get(index);
            this.userService.rooms.push(room);
        }
    }

    // DirectJoin room
    directJoin(name: string): IRoom {
        console.log("RoomService directJoin");
        //nickname's room create
        this.create(name);

        for (let roomIndex in this.userService.rooms) {
            let room = this.userService.rooms[roomIndex];
            room.status = 1; // 고객 입장
            if (room.name === name) {
                // status control
console.log("RoomService directJoin:exists:status:" + this.userService.status);
                this.userService.status = 5;
                return room;
            }
        }
        let index = this.findIndex(name);
        if (index !== -1) {
            let room = this.list.get(index);
            room.status = 1; // 고객 입장
            this.userService.rooms.push(room);
        }
console.log("RoomService directJoin:new:status:" + this.userService.status);
        this.userService.status = 5;
        return this.userService.rooms[index];
    }

    // Leave room
    leave(name: string) {
        console.log("RoomService leave");
        // First remove the room from user joined rooms
        for (var i = 0; i < this.userService.rooms.length; i++) {
            let room = this.userService.rooms[i];
            if (room.name === name) {
                if (this.userService.usertype === "customer") room.status = 4; //고객 퇴장
                else room.status = 3; // 상담사 퇴장 
                this.userService.rooms.splice(i, 1);
            }
        }
    }

    // Create room
    create(name: string) {
        console.log("RoomService create");
        this.socketService.create(name);
    }

    // Remove room
    remove(name: string) {
        console.log("RoomService remove");
        // First remove the room from user joined rooms
        for (var i = 0; i < this.userService.rooms.length; i++) {
            let room = this.userService.rooms[i];
            if (room.name === name) {
                room.status = 5; // 종료 
                this.userService.rooms.splice(i, 1);
            }
        }

        // Send signal to remove the room
        this.socketService.remove(name);
    }

    // Find matching room
    private findIndex(name: string): number {
        return this.list.findIndex((room: IRoom) => {
            return room.name === name;
        });
    }
}