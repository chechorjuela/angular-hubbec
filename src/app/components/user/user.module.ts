import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { MainComponent } from './main/main.component';
import {UserRoutingModule} from "./user-routing.module";




@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
