import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "../components/login/auth/auth.component";
import {NotfoundComponent} from "../components/shared/notfound/notfound.component";
import {AuthGuard} from "../Applications/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../components/login/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('../components/user/user-routing.module').then(m => m.UserRoutingModule)
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
