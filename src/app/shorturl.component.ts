import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs";
import { MyHttpService } from './shared/myhttp.service';

declare var require;
const styles: string = require("./app.component.scss");
const template: string = require("./shorturl.component.html");

var Q      = require("q");
var rtnUrl = "";

@Component({
    selector: "shorturl",
    styles: [styles],
    template
})

export class ShortUrlComponent implements OnInit, AfterViewInit {
    @ViewChild('focus') private focus: ElementRef;
    long_url: string;
    short_url: string;
    full_url: string

    constructor(private myHttp: MyHttpService) {}

    // On Init
    ngOnInit(): void {
    	this.long_url = "";
    	this.short_url = "";
        this.full_url = "";
    }

    // After view initialised, focus on nickname text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    // Save nickname to user store
    changeUrl(): void {
        // this.userService.create(this.nickname, this.password, this.usertype, new Date());
        var url = "http://localhost:2582/create?long_url=" + this.long_url;
        
        this.myHttp.getDataObservable(url).subscribe(
            data => {
                // JSON.parse(data, function (key, value) {
                //     console.log(key + ":" + value);
                //     if (key == "_body") {
                //         this.short_url = value;
                //     }
                // });
                this.short_url = JSON.parse(data)._body; 
                this.full_url = "http://" + window.location.hostname  + ":2582/" + this.short_url;
            }
        );
        
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
            this.changeUrl();
        }
    }
}