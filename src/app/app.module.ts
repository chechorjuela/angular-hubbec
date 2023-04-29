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
import {NotfoundComponent} from './components/shared/notfound/notfound.component';
import {AuthService, IAuthService} from "./services/auth/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptorInterceptor} from "./Applications/interceptors/error-interceptor.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MainComponent} from "./components/user/main/main.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    NotfoundComponent,
    MainComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true},
    {provide: IAuthService, useClass: AuthService},
  ],
  exports: [
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
