import { Component } from "@angular/core";

import { UserService } from "./shared/user.service";

declare var require;
const styles: string = require("./customer.component.scss");
const template: string = require("./customer.component.html");

@Component({
    selector: "customer",
    styles: [styles],
    template
})

export class CustomerComponent {
    constructor(public userService: UserService) {}
}
