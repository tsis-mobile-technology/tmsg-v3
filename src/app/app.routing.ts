import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App component
import { AppComponent } from "./app.component";
import { CustComponent } from "./cust.component";
import { CallComponent } from "./call.component";
import { UserComponent } from "./user.component";
import { ShortUrlComponent } from "./shorturl.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/call', pathMatch: 'full' },
  { path: 'call',	component: CallComponent },
  { path: 'cust/:nickname',	component: CustComponent },
  { path: 'user',	component: UserComponent },
  { path: 'shorturl',	component: ShortUrlComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
