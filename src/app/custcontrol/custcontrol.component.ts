import { Component } from "@angular/core";

import { RoomService } from "../shared";

import { IRoom } from "../../models";

import { UserService } from "../shared";

declare var require;
const styles: string = require("./custcontrol.component.scss");
const template: string = require("./custcontrol.component.html");

@Component({
    selector: "custcontrol",
    styles: [styles],
    template
})

export class CustcontrolComponent {
    room: string = "";
    newRoom: string = "";

    constructor(
        public roomService: RoomService,
        public userService: UserService) {

        //IF userService.usertype == "counselor"
        //THEN auto create chat room 
        if(userService.usertype == "counselor" && userService.nickname != null) this.room = userService.nickname;
    }

    // Join room, when Join-button is pressed
    join(): void {
        console.log("room name : " + this.room );
        console.log("newRoom name : " + this.newRoom );
        this.roomService.join(this.room);
    }

    // Create room, when Create-button is pressed and empty newRoom text input
    create(): void {
        //this.roomService.create(this.newRoom);
        //this.newRoom = "";
        console.log("room name : " + this.room );
        console.log("newRoom name : " + this.newRoom );
        this.roomService.create(this.userService.nickname);
        this.newRoom = this.userService.nickname;
        this.room = this.userService.nickname;
    }

    // Remove room, when Remove-button is pressed and unset selected room
    remove(): void {
        console.log("room name : " + this.room );
        console.log("newRoom name : " + this.newRoom );
        this.roomService.remove(this.room);
        this.room = "";
    }

    // Handle keypress event (for creating a new room)
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.create();
        }
    }
}
