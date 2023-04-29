import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "../components/login/auth/auth.component";
import {NotfoundComponent} from "../components/shared/notfound/notfound.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../components/login/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user',
    loadChildren: () => import('../components/user/user.module').then(m => m.UserModule)
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
