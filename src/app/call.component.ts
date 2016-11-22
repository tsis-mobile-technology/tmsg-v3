import { Component } from "@angular/core";

import { UserService } from "./shared/user.service";

declare var require;
const styles: string = require("./app.component.scss");
const template: string = require("./call.component.html");

@Component({
    selector: "call",
    styles: [styles],
    template
})

export class CallComponent {
    constructor(public userService: UserService) {}
}
