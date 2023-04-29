import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NgToastModule} from "ng-angular-popup";

import {AppRoutingModule} from './routes/app-routing.module';
import {AppComponent} from './components/app/app.component';
import {SignInComponent} from './components/login/sign-in/sign-in.component';
import {AuthComponent} from './components/login/auth/auth.component';
import {SignUpComponent} from "./components/login/sign-up/sign-up.component";
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "./components/user/dashboard/dashboard.component";
import { NotfoundComponent } from './components/shared/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    NotfoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgToastModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
