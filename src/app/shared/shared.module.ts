import { NgModule } from "@angular/core";

import { OrderByPipe } from "./order-by.pipe";
import { RoomService } from "./room.service";
import { SocketService } from "./socket.service";
import { UserService } from "./user.service";
import { UserSocketService } from "./user-socket.service";
import { MyHttpService } from "./myhttp.service";
import { DatabaseService } from "./database.service";

@NgModule({
    declarations: [
        OrderByPipe
    ],
    providers: [
        RoomService,
        UserService,
        SocketService,
        UserSocketService,
        MyHttpService,
        DatabaseService
    ],
    exports: [
        OrderByPipe
    ]
})
export class SharedModule {}
