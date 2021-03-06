import { Component } from "@angular/core";

import { UserService } from "./shared/user.service";

declare var require;
const styles: string = require("./app.component.scss");

@Component({
    selector: "app",
    styles: [styles],
    template:'<router-outlet></router-outlet>'
})

export class AppComponent {
    constructor(public userService: UserService) {}
}
