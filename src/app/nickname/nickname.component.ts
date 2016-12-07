import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
// import { RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import { UserService } from "../shared";
import { ErrorComponent } from "../common";

declare var require;
const styles: string = require('./nickname.component.scss');
const template: string = require('./nickname.component.html');

@Component({
    selector: 'nickname',
    styles: [styles],
    template,
    // directives: [ROUTER_DIRECTIVES, ErrorMessage] // Note ErrorMessage is a directive
})

export class NicknameComponent implements AfterViewInit/*, OnActivate*/ {
    @ViewChild('focus') private focus: ElementRef;
    // @ViewChild(ErrorComponent) errorMsg: ErrorComponent;  // ErrorMessage is a ViewChild

    nickname: string;
    usertype: string;
    nickname_password: string;
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
        this.userService.login(this.nickname, this.usertype, this.nickname_password, new Date());
        // ErrorComponent
        // let rtn = this.userService.login(this.nickname, this.usertype, this.nickname_password, new Date()).subscribe(x =>
        // {
        //     x.Error = true;
        //     x.Message = "This is a dummy error message";

        //     if (x.Error) {
        //         this.errorMsg.showErrorMessage(x.Message);
        //     }
        // });
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
