import { NgModule } from "@angular/core";

import { OrderByPipe } from "./order-by.pipe";
import { RoomService } from "./room.service";
import { SocketService } from "./socket.service";
import { UserService } from "./user.service";

@NgModule({
    declarations: [
        OrderByPipe
    ],
    providers: [
        RoomService,
        UserService,
        SocketService
    ],
    exports: [
        OrderByPipe
    ]
})
export class SharedModule {}
