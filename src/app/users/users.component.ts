import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from "../shared";

declare var require;
const styles: string = require('./users.component.scss');
const template: string = require('./users.component.html');

@Component({
    selector: 'users',
    styles: [styles],
    template
})

export class UsersComponent implements AfterViewInit {
    @ViewChild('focus') private focus: ElementRef;
    nickname: string;
    usertype: string;
    password: string;
    created: Date;
    status: number;
    users: any;

    constructor(public userService: UserService) {
        this.nickname = userService.nickname;
        this.usertype = "counselor";
    }

    // After view initialised, focus on nickname text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    // Save nickname to user store
    counselorSave(): void {
        this.userService.create(this.nickname, this.password, this.usertype, new Date());
    }

    // user list
    userlist(): void {
        this.userService.userlist();
    }

    // Handle keypress event, for saving nickname
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.counselorSave();
        }
    }
}
