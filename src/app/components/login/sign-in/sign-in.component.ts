import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {IAuthService} from "../../../services/auth/auth.service";
import {finalize} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {


  hide = true;

  constructor(
    private router: Router,
    private toast: NgToastService,
    private authService: IAuthService) {
  }

  formSign = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit(): void {
    this.authService.signIn(this.formSign.value).pipe(
      finalize(() => {

      })
    ).subscribe(result => {
      this.toast.success({detail:'Usario logeado correctamente'});
      this.router.navigate(['/user']);
    }, error => {
      this.toast.error({detail:'Usuario o contranse no son correctos'});
    })
    //this.router.navigate(['/user/dashboard']);
  }
}
