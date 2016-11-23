import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from "../shared";

declare var require;
const styles: string = require('./custnickname.component.scss');
const template: string = require('./custnickname.component.html');

@Component({
    selector: 'custnickname',
    styles: [styles],
    template
})

export class CustnicknameComponent implements AfterViewInit {
    @ViewChild('focus') private focus: ElementRef;
    nickname: string;
    usertype: string;
    created: Date;

    constructor(public userService: UserService) {
        this.nickname = userService.nickname;
        this.usertype = "customer";
    }

    // After view initialised, focus on nickname text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    // Save nickname to user store
    save(): void {
        console.log("CustnicknameComponent save nickname:" + this.nickname);
        console.log("CustnicknameComponent save usertype:" + this.usertype);
        this.userService.save(this.nickname, this.usertype, new Date());
    }

    // Handle keypress event, for saving nickname
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.save();
        }
    }
}
