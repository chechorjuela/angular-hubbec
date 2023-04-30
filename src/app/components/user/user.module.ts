import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainComponent} from './main/main.component';
import {UserRoutingModule} from "./user-routing.module";
import {MatInputModule} from "@angular/material/input";
import {TokenInterceptorInterceptor} from "../../Applications/interceptors/token-interceptor.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true},
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule {
}
