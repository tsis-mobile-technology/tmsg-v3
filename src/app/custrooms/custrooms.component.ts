import { Component } from "@angular/core";

import { UserService } from "../shared";
import { IRoom } from "../../models";

declare var require;
const styles: string = require("./custrooms.component.scss");
const template: string = require("./custrooms.component.html");

@Component({
    selector: "custrooms",
    styles: [styles],
    template
})

export class CustroomsComponent {
    constructor(public userService: UserService) {}
}
