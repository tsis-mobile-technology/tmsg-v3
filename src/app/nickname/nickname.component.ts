import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from "../shared";

declare var require;
const styles: string = require('./nickname.component.scss');
const template: string = require('./nickname.component.html');

@Component({
    selector: 'nickname',
    styles: [styles],
    template
})

export class NicknameComponent implements AfterViewInit {
    @ViewChild('focus') private focus: ElementRef;
    nickname: string;
    usertype: string;

    constructor(public userService: UserService) {
        this.nickname = userService.nickname;
        this.usertype = userService.usertype;
    }

    // After view initialised, focus on nickname text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    // Save nickname to user store
    save(): void {
        this.userService.nickname = this.nickname;
        this.userService.usertype = this.usertype;
    }

    // Handle keypress event, for saving nickname
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.save();
        }
    }
}
