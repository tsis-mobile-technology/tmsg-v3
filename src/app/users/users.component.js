"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_1 = require("../shared");
var styles = require('./users.component.scss');
var template = require('./users.component.html');
var UsersComponent = (function () {
    function UsersComponent(userService) {
        this.userService = userService;
        this.nickname = userService.nickname;
        this.usertype = "counselor";
    }
    // On Init
    UsersComponent.prototype.ngOnInit = function () {
        this.userService.userlist();
        this.users = this.userService.users;
    };
    // After view initialised, focus on nickname text input
    UsersComponent.prototype.ngAfterViewInit = function () {
        this.focus.nativeElement.focus();
    };
    // Save nickname to user store
    UsersComponent.prototype.counselorSave = function () {
        this.userService.create(this.nickname, this.password, this.usertype, new Date());
    };
    // Delete nickname to user store
    UsersComponent.prototype.counselorDelete = function (nickname) {
        this.userService.remove(nickname);
    };
    // user list
    UsersComponent.prototype.userlist = function () {
        // userlist call?
        // this.users = this.userService.userlist();
        this.userService.userlist();
        this.users = this.userService.users;
        console.log(this.users);
    };
    // Handle keypress event, for saving nickname
    UsersComponent.prototype.eventHandler = function (event) {
        if (event.key === "Enter") {
            this.counselorSave();
        }
    };
    return UsersComponent;
}());
__decorate([
    core_1.ViewChild('focus'),
    __metadata("design:type", core_1.ElementRef)
], UsersComponent.prototype, "focus", void 0);
UsersComponent = __decorate([
    core_1.Component({
        selector: 'users',
        styles: [styles],
        template: template
    }),
    __metadata("design:paramtypes", [shared_1.UserService])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map