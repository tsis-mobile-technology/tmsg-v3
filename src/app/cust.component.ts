import { Component } from "@angular/core";

import { UserService } from "./shared/user.service";

declare var require;
const styles: string = require("./app.component.scss");
const template: string = require("./cust.component.html");

@Component({
    selector: "cust",
    styles: [styles],
    template
})

export class CustComponent {
    constructor(public userService: UserService) {}
}
