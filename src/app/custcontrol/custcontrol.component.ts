import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";

import { IRoom, IUser } from "../../models";

import { UserService, RoomService } from "../shared";

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
        public userService: UserService,
        public roomService: RoomService) {
        console.log("CustcontrolComponent constructor");
        //IF userService.usertype == "counselor"
        //THEN auto create chat room 
        // if(this.userService.usertype == "customer" && this.userService.nickname != null) {
        //     //chating room create
        //     //this.wait(this.userService.nickname);
        //     console.log("this is ...");
        // }
    }

    // ngOnInit(): void {
    //     console.log("CustcontrolComponent ngOnInit");

    // }

    // ngAfterViewInit(): void {
    //     console.log("CustcontrolComponent ngAfterViewInit");
    //     //directory join chatroom & wait counselor
    //     if( this.userService.usertype == "customer") {
    //         this.roomService.checkRooms(this.userService.nickname);
    //         //this.roomService.joinCust();
    //         //this.userService.room = this.roomService.directJoin(this.userService.nickname);    
    //     }
    //     console.log("RoomService constructor userService:" + this.userService.room);
    // }

    // ngOnDestory(): void {
    //     console.log("CustcontrolComponent ngOnDestory");   
    // }

    joinCust(): void {
        //this.roomService.joinCust();
        this.roomService.join(this.room);
    }

    wait(name: string): void {
        console.log("Custcontrol wait");
        this.roomService.create(name);
        // this.userService.room = this.roomService.directJoin(name);
    }

    // Join room, when Join-button is pressed
    join(): void {
        console.log("Custcontrol join");
        console.log("room name : " + this.room );
        console.log("newRoom name : " + this.newRoom );
        this.roomService.join(this.room);
    }

    // Create room, when Create-button is pressed and empty newRoom text input
    create(): void {
        //this.roomService.create(this.newRoom);
        //this.newRoom = "";
        console.log("Custcontrol create");
        console.log("room name : " + this.room );
        console.log("newRoom name : " + this.newRoom );
        this.roomService.create(this.userService.nickname);
        this.newRoom = this.userService.nickname;
        this.room = this.userService.nickname;

    }

    // Remove room, when Remove-button is pressed and unset selected room
    remove(): void {
        console.log("Custcontrol remove");
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

    // Delete nickname to user store
    userDelete(): void {
        console.log("Custcontrol save userDelete:" + this.userService.nickname);
        if(this.userService.usertype == "customer" && this.userService.nickname != null) {
            //chating room create
            if(this.room && this.room != "" ) {
                this.remove();
            }
        }
        this.userService.logout(this.userService.nickname);
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
