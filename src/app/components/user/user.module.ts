import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {MainComponent} from './main/main.component';
import {UserRoutingModule} from "./user-routing.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HobbieComponent} from "./hobbie/hobbie.component";
import {ProfileComponent} from './profile/profile.component';
import {TokenInterceptorInterceptor} from "../../Applications/interceptors/token-interceptor.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    HobbieComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true},
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule {
}
