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
        console.log("RoomService constructor here?");
        this.socketService
            .get("room")
            .subscribe(
                (socketItem: ISocketItem) => {
                    let room: IRoom = socketItem.item;
console.log("subscribe:room.name:" + room.name);                    
console.log("subscribe:room.name:index:" + this.findIndex(room.name));                    
                    let index: number = this.findIndex(room.name);
                    if (socketItem.action === "remove") {
                        // Remove
                        this.list = this.list.delete(index);
                    } else {
                        if (index === -1) {
                            // Create
                            room.status = 0; // 생성
                            this.list = this.list.push(room);
console.log("if");
                        } else {
                            // Update
                            this.list = this.list.set(index, room);
console.log("else");
                        }
                        if( this.userService.usertype == "customer" && room.status == 0 && this.userService.status == 0) {
                            console.log("RoomService constructor nickname:" + this.userService.nickname + "'s chat wait....");
                            console.log("RoomService constructor room name:" + room.name);
                            console.log("RoomService constructor room status:" + room.status);
                            // room.status = 1;
                            this.checkRooms(room.name);
                        }
                    }
                    this.rooms.next(this.list);
                }, error => {console.log(error);},
                () => {console.log("completed");}
            );
    }

    // Join room
    joinCust(name: string): number {
        console.log("RoomService joinCust");

        let roomIndex: number = this.userService.rooms.length;
console.log("room index size !!!!!:" + roomIndex);        
        while (roomIndex > 0) {
            if(this.userService.rooms[roomIndex].name == name) {
                console.log("already join!!!!!:" + name );
                return -1;
            }
            roomIndex = roomIndex - 1;
        }

        let index = this.findIndex(name);
console.log("join?......index:" + index );
        if (index !== -1) {
            let room = this.list.get(index);
console.log("before?......index:name:" + room.name );
console.log("before?......index:status:" + room.status );
            this.userService.status = 5;
            room.status = 1;
            this.userService.rooms.push(room);
console.log("after?......index:name:" + room.name );
console.log("after?......index:status:" + room.status );
        }
        return index;
    }

    // Join room
    join(name: string): void {
        console.log("RoomService join");
        for (let roomIndex in this.userService.rooms) {
            let room = this.userService.rooms[roomIndex];
console.log("join?......name:" + room.name );
console.log("join?......status:" + room.status );
            if (room.name == name && room.status == 0) {
                // status control
                this.userService.status = 5;
                this.userService.rooms[roomIndex].status = 1;

                return;
            } else {
                console.log("join?......");
                return;
            }
        }
        let index = this.findIndex(name);
console.log("join?......index:" + index );
        if (index !== -1) {
            let room = this.list.get(index);
            this.userService.rooms.push(room);
console.log("join?......index:name:" + room.name );
console.log("join?......index:status:" + room.status );

        }
    }

    checkRooms(name: string): void {
        var millisecondsToWait = 2000;

        let rtnNum = this.joinCust(name);
        
        // while(rtnNum < -1) {
        //     setTimeout(function() {
        //         console.log("channel check.....");
        //     }, millisecondsToWait);
        //     rtnNum = this.joinCust(name);
        // }
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
            console.log("findIndex name:" + name);
            return room.name === name;
        });
    }
}