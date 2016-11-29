import { Component } from "@angular/core";

import { UserService } from "./shared/user.service";

declare var require;
const styles: string = require("./app.component.scss");
const template: string = require("./user.component.html");

@Component({
    selector: "user",
    styles: [styles],
    template
})

export class UserComponent {
    constructor(public userService: UserService) {}
}
