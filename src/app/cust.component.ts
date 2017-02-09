import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

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

	private sub: any;

    constructor(public userService: UserService,
    	        private route: ActivatedRoute) {}

	private ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.userService.nickname = params['nickname']; // (+) converts string 'id' to a number
			this.userService.status = 6; //6: 상담실 대기(customer)
		});
	}

	private ngOnDestroy() {
		this.sub.unsubscribe();
	}
}