import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs";

import { UserService } from "../shared";
import { IUser } from "../../models";

declare var require;
const styles: string = require('./users.component.scss');
const template: string = require('./users.component.html');

@Component({
    selector: 'users',
    styles: [styles],
    template
})

export class UsersComponent implements OnInit, AfterViewInit {
    @ViewChild('focus') private focus: ElementRef;
    nickname: string;
    usertype: string;
    password: string;
    created: Date;
    status: number;
    users: IUser[];

    constructor(public userService: UserService) {
        this.nickname = userService.nickname;
        this.usertype = "counselor";
    }

    // On Init
    ngOnInit(): void {
        this.users = this.userService.userlist();
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
       // userlist call?
       // this.users = this.userService.userlist();
       console.log(this.users);
    }

    // Handle keypress event, for saving nickname
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.counselorSave();
        }
    }
}
