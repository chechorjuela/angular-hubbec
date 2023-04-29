import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthRoutingModule} from "./auth-routing.module";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AuthService, IAuthService} from "../../services/auth/auth.service";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers:[
    { provide: IAuthService, useClass: AuthService },
  ]
})
export class AuthModule { }
