import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs";

declare var require;
const styles: string = require("./app.component.scss");
const template: string = require("./shorturl.component.html");

@Component({
    selector: "shorturl",
    styles: [styles],
    template
})

export class ShortUrlComponent implements OnInit, AfterViewInit {
    @ViewChild('focus') private focus: ElementRef;
    long_url: string;
    short_url: string;

    constructor() {}

    // On Init
    ngOnInit(): void {
    	this.long_url = "";
    	this.short_url = "";
    }

    // After view initialised, focus on nickname text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    // Save nickname to user store
    counselorSave(): void {
        // this.userService.create(this.nickname, this.password, this.usertype, new Date());
    }

    // Delete nickname to user store
    counselorDelete(nickname: string): void {
        // this.userService.remove(nickname);
    }

    // user list
    userlist(): void {

       // this.userService.userlist();
       // this.users = this.userService.users;
       // console.log(this.users);
    }

    // Handle keypress event, for saving nickname
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.counselorSave();
        }
    }
}