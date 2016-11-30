import { Component } from "@angular/core";
import {FormControl, FormGroup} from '@angular/forms';

import { RoomService } from "../shared";

import { IRoom } from "../../models";

import { UserService } from "../shared";

declare var require;
const styles: string = require("./control.component.scss");
const template: string = require("./control.component.html");
interface IStatus {
    value: string;
    key: number;
}

@Component({
    selector: "control",
    styles: [styles],
    template
})

export class ControlComponent {
    room: string = "";
    newRoom: string = "";
    statusObj: IStatus;
    statusObjs: IStatus[] = [{value: "로그인", key: 0}, {value: "상담 중", key: 1}, {value: "상담 대기", key: 2}, {value: "후처리", key: 3}, {value: "휴식", key: 4}]; 

    constructor(
        public roomService: RoomService,
        public userService: UserService) {

        //IF userService.usertype == "counselor"
        //THEN auto create chat room 
        //if(userService.user.usertype == "counselor" && userService.user.nickname != null) this.room = userService.user.nickname;
        this.statusObj = this.statusObjs.find((obj:IStatus) => obj.key === this.userService.status);
    }

    // Join room, when Join-button is pressed
    join(): void {
        console.log("ControlComponent join : " + this.room );
        this.roomService.join(this.room);
        this.changeStatus(2);
    }

    // Create room, when Create-button is pressed and empty newRoom text input
    create(): void {
        console.log("ControlComponent create : " + this.room );
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
        console.log("ControlComponent remove : " + this.room );
        this.roomService.remove(this.room);
        this.room = "";
        this.changeStatus(3);
    }

    // Handle keypress event (for creating a new room)
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.create();
        }
    }

    onChange(event: Event): void {
        let value: string = (<HTMLSelectElement>event.srcElement).value;
        this.statusObj = this.statusObjs.find((obj:IStatus) => obj.value === value);

        this.userService.status = this.statusObj.key;
    }

    // status Change
    changeStatus(status: number): void {
        console.log("ControlComponent changeStatus:" + status);
        this.userService.status = status;
    }

    // status check
    checkStatus(): void {
        console.log("ControlComponent checkStatus:" + this.userService.status);
    }

}
