import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  formUpdate = new FormGroup({
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
}
