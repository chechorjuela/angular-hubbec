import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MainComponent} from "./main/main.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HobbieComponent} from "./hobbie/hobbie.component";
import {ProfileComponent} from "./profile/profile.component";
import {ComplateProfileGuard} from "../../Applications/guards/complate-profile.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        canActivate: [ComplateProfileGuard],
        component: DashboardComponent
      },
      {
        path: 'hobbie',
        canActivate: [ComplateProfileGuard],
        component: HobbieComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
