import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";

import { UserService, RoomService } from "../shared";
import { IRoom } from "../../models";

declare var require;
const styles: string = require("./custrooms.component.scss");
const template: string = require("./custrooms.component.html");

@Component({
    selector: "custrooms",
    styles: [styles],
    template
})

export class CustroomsComponent {
    constructor(public userService: UserService,public roomService: RoomService) {
    	console.log("CustroomsComponent constructor");
    }

    ngOnInit(): void {
        console.log("CustroomsComponent ngOnInit");

        //directory join chatroom & wait counselor
        // if( this.userService.usertype == "customer") {
        //     this.userService.room = this.roomService.directJoin(this.userService.nickname);    
        // }
        // console.log("RoomService constructor userService:" + this.userService.room);
    }

    ngAfterViewInit(): void {
        console.log("CustroomsComponent ngAfterViewInit");        
    }
}
