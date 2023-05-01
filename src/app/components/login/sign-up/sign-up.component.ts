import {Component} from '@angular/core';
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IAuthService} from "../../../services/auth/auth.service";
import {SignUpRequestDto} from "../../../Domain/dto/requestDto/signUp.request.dto";
import {TypeId} from "../../../../helpers/enums/typeId.enum";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  // @ts-ignore
  typeIdOptions = Object.keys(TypeId).map(key => ({ label: key, value: TypeId[key] }));

  hide = true;
  hideRpt = true;

  formRegister = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    typeId: new FormControl('', [Validators.required]),
    numberId: new FormControl('', [Validators.required]),
    expeditionDate: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: IAuthService,
    private toast: NgToastService) {
  }


  onSubmit() {
    const values = this.formRegister.value as unknown as SignUpRequestDto;
    this.authService.signUp(values).subscribe(value => {
      console.info(value);
      if(value){
        this.toast.success({
          detail: "Usuario Creado",
          duration: 5000,
          summary: "Usuario creado puedes ingresar con tu correo y contraseña"
        })
        this.formRegister.reset();
      }
    })

  }

}
