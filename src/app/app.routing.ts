import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App component
import { AppComponent } from "./app.component";
import { CustComponent } from "./cust.component";
import { CallComponent } from "./call.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/call', pathMatch: 'full' },
  { path: 'call',	component: CallComponent },
  { path: 'cust',	component: CustComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
