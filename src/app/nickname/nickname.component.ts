import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
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
    created: Date;

    constructor(public userService: UserService, public router: Router) {
        this.nickname = userService.nickname;
        this.usertype = "counselor";
    }

    // After view initialised, focus on nickname text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    // Save nickname to user store
    counselorLogin(): void {
        this.userService.login(this.nickname, this.usertype, new Date());
    }

    // Handle keypress event, for saving nickname
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.counselorLogin();
        }
    }

    gotocust(): void {
        this.router.navigateByUrl("/cust");
    }

    gotouser(): void {
        this.router.navigateByUrl("/user");
    }
}
