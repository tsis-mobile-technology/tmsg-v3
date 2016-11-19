import { BrowserModule  } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// App component
import { CustomerComponent } from "./customer.component";

// Shared module
import { SharedModule } from "./shared/shared.module";

// Other components
import { ControlComponent } from "./control";
import { NicknameComponent } from "./nickname";
import { RoomComponent } from "./room";
import { RoomsComponent } from "./rooms";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        CustomerComponent,
        ControlComponent,
        NicknameComponent,
        RoomComponent,
        RoomsComponent
    ],
    bootstrap: [
        CustomerComponent
    ]
})
export class CustomerModule {}
