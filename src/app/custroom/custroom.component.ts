import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { RoomService, UserService, SocketService } from "../shared";
import { IMessage, IRoom, IUser } from "../../models";

import { MessageService } from "./message.service";

declare var require;
const styles: string = require('./custroom.component.scss');
const template: string = require('./custroom.component.html');

@Component({
    selector: 'room',
    styles: [styles],
    template
})

export class CustRoomComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('scroll') private scroll: ElementRef;
    @ViewChild('focus') private focus: ElementRef;
    @Input() room: IRoom;
    message: string = "";
    messages: IMessage[];
    private messageService: MessageService;
    private alreadyLeftChannel: boolean = false;

    constructor(
        private roomService: RoomService,
        public userService: UserService,
        public socketService: SocketService
    ) {console.log("CustRoomComponent constructor");}

    // Handle keypress event, for saving nickname
    ngOnInit(): void {
        console.log("CustRoomComponent ngOnInit");
        this.messageService = new MessageService(this.room.name);
        this.messageService.messages.subscribe(messages => {
            this.messages = messages;
            setTimeout( () => {
                this.scrollToBottom();
            }, 200);
        });
        this.messageService.create(this.userService.user.nickname, "joined the channel");
        // status control
        // status: 5 -> 2(상담실 입장 -> 대기)
console.log("CustRoomComponent ngOnInit:status:" + this.userService.status);
        if( this.userService.status == 5) {
            this.userService.status = 2;
        }
    }

    // After view initialized, focus on chat message text input
    ngAfterViewInit(): void {
        console.log("CustRoomComponent ngAfterViewInit");
        this.focus.nativeElement.focus();
    }

    // When component is destroyed, ensure that leave message is sent
    ngOnDestroy(): void {
        console.log("CustRoomComponent ngOnDestroy");
        if (!this.alreadyLeftChannel) {
            this.leave();
        }
    }

    // Send chat message, and reset message text input
    send(): void {
        console.log("CustRoomComponent send");
        this.messageService.create(this.userService.user.nickname, this.message);
        this.message = "";
    }

    // Leave room gracefully
    leave(): void {
        console.log("CustRoomComponent leave");
        this.alreadyLeftChannel = true;
        this.messageService.create(this.userService.user.nickname, "left the channel");
console.log("CustRoomComponent leave:status:" + this.userService.status);
        this.userService.status = 3;
        this.roomService.leave(this.room.name);
console.log("CustRoomComponent leave:status:" + this.userService.status);
        this.userService.status = 0;
    }

    //* Scroll to bottom (this is called when new message is received)
    scrollToBottom(): void {
        try {
            this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
        } catch(error) {
            console.log("ERROR:", error);
        }                 
    }

    // Handle keypress event, for sending chat message
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.send();
        }
    }
}
