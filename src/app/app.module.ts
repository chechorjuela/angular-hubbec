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
import {ProfileComponent} from "./components/user/profile/profile.component";
import {MatTableModule} from "@angular/material/table";
import {DashboardComponent} from "./components/user/dashboard/dashboard.component";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {HobbieService, IHobbieService} from "./services/hobbie/hobbie.service";
import {TokenInterceptorInterceptor} from "./Applications/interceptors/token-interceptor.interceptor";
import {HobbieComponent} from "./components/user/hobbie/hobbie.component";
import { ModalConfirmDeleteComponent } from './components/shared/modal-confirm-delete/modal-confirm-delete.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ModalHobbieComponent } from './components/shared/modal-hobbie/modal-hobbie.component';
import {IUserService, UserService} from "./services/user/user.service.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    HobbieComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    NotfoundComponent,
    MainComponent,
    ProfileComponent,
    ModalConfirmDeleteComponent,
    ModalHobbieComponent,
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
    MatTableModule,
    MatPaginatorModule,
    MatOptionModule,
    MatProgressBarModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true},
    {provide: IAuthService, useClass: AuthService},
    {provide: IHobbieService, useClass: HobbieService},
    {provide: IUserService, useClass: UserService},
  ],
  exports: [
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
