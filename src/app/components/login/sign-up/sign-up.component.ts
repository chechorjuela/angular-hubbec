import {Component} from '@angular/core';
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  formRegister = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    typeId: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    expeditionDate: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rptPassword: new FormControl('', [Validators.required])
  });

  constructor(private toast: NgToastService) {
  }


  onSubmit() {
    this.toast.success({
      detail: "Usuario Logeado",
      duration: 5000,
      summary: "Usuario logeado correctamente puedes ingresar con tu numero"
    })
    this.formRegister.reset();
  }

}
