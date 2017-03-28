import { BrowserModule  } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// App component
import { AppComponent } from "./app.component";
import { CallComponent } from "./call.component";
import { CustComponent } from "./cust.component";
import { UserComponent } from "./user.component";
import { ShortUrlComponent } from "./shorturl.component";

// Routing Module
import { AppRoutingModule } from "./app.routing";

// Shared module
import { SharedModule } from "./shared/shared.module";

// Other components
import { ControlComponent } from "./control";
import { NicknameComponent } from "./nickname";
import { RoomComponent } from "./room";
import { RoomsComponent } from "./rooms";
import { CustnicknameComponent } from "./custnickname";
import { CustcontrolComponent } from "./custcontrol";
import { CustroomComponent } from "./custroom";
import { CustroomsComponent } from "./custrooms";
import { UsersComponent } from "./users";
import { ErrorComponent } from "./common";


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        SharedModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        CustComponent,
        CallComponent,
        UserComponent,
        ControlComponent,
        NicknameComponent,
        RoomComponent,
        RoomsComponent,
        CustnicknameComponent,
        CustcontrolComponent,
        CustroomComponent,
        CustroomsComponent,
        UsersComponent,
        ErrorComponent
    ],
    providers: [ ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
