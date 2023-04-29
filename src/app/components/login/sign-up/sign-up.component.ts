import {Component} from '@angular/core';
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IAuthService} from "../../../services/auth/auth.service";
import {SignUpRequestDto} from "../../../Domain/dto/requestDto/signUp.request.dto";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  hide = true;

  formRegister = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    cellphone: new FormControl('', [Validators.required]),
    typeId: new FormControl('', [Validators.required]),
    numberId: new FormControl('', [Validators.required]),
    expeditionDate: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rptPassword: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: IAuthService,
    private toast: NgToastService) {
  }


  onSubmit() {
    const values = this.formRegister.value as unknown as SignUpRequestDto;
    this.authService.signUp(values).subscribe(value => {

    })
    this.toast.success({
      detail: "Usuario Logeado",
      duration: 5000,
      summary: "Usuario logeado correctamente puedes ingresar con tu numero"
    })
    this.formRegister.reset();
  }

}
