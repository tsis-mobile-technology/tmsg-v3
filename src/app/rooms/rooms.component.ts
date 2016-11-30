import { Component } from "@angular/core";

import { UserService, RoomService } from "../shared";
import { IRoom } from "../../models";

declare var require;
const styles: string = require("./rooms.component.scss");
const template: string = require("./rooms.component.html");

@Component({
    selector: "rooms",
    styles: [styles],
    template
})

export class RoomsComponent {
    room: string = "";
    newRoom: string = "";

    constructor(
        public roomService: RoomService,
        public userService: UserService) {}

    // Join room, when Join-button is pressed
    join(): void {
        console.log("RoomsComponent join : " + this.room );
        this.roomService.join(this.room);
        this.changeStatus(2);
    }

    // Create room, when Create-button is pressed and empty newRoom text input
    create(): void {
        console.log("RoomsComponent create : " + this.room );
        //this.roomService.create(this.newRoom);
        //this.newRoom = "";
        console.log("room name : " + this.room );
        console.log("this.userService.user.nickname : " + this.userService.user.nickname);
        this.roomService.create(this.userService.user.nickname);
        this.newRoom = this.userService.user.nickname;
        this.room = this.userService.user.nickname;
        this.changeStatus(2);
    }

    // Remove room, when Remove-button is pressed and unset selected room
    remove(): void {
        console.log("RoomsComponent remove : " + this.room );
        this.roomService.remove(this.room);
        this.room = "";
        this.changeStatus(3);
    }

    // status Change
    changeStatus(status: number): void {
        console.log("RoomsComponent changeStatus:" + status);
        this.userService.status = status;
    }
}
