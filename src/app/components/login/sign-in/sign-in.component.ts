import {Component} from '@angular/core';
import {formatSize} from "@angular-devkit/build-angular/src/webpack/utils/stats";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(private router: Router) { }

  formSign = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit(): void {
    this.router.navigate(['/user/dashboard']);
  }
}
