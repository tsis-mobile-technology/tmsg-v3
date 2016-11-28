import { Component } from "@angular/core";

import { UserService } from "../shared";
import { IRoom } from "../../models";

declare var require;
const styles: string = require("./custrooms.component.scss");
const template: string = require("./custrooms.component.html");

@Component({
    selector: "rooms",
    styles: [styles],
    template
})

export class CustRoomsComponent {
    constructor(public userService: UserService) {}
}
