import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IUserService} from "../../../services/user/user.service.service";
import {TokenService} from "../../../services/token/token.service";
import {ProfileRequestDto} from "../../../Domain/dto/responseDto/profile.respose.dto";
import {TypeId} from "../../../../helpers/enums/typeId.enum";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile!: ProfileRequestDto;
  formProfile!: FormGroup;
  requiredFileType = ['JPG'];
  fileName = '';
  uploadProgress = 0;
  // @ts-ignore
  typeIdOptions = Object.keys(TypeId).map(key => ({ label: key, value: TypeId[key] }));

  constructor(
    private tokenService: TokenService,
    private userService: IUserService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {

    this.formProfile = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', [Validators.required]),
      phonenumber: new FormControl('', [Validators.required]),
      typeId: new FormControl('', [Validators.required]),
      numberId: new FormControl('', [Validators.required]),
      expeditionDate: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
    this.loadDataForm();


  }

  cancelUpload(): void {

  }

  loadDataForm(): void {
    const {id} = JSON.parse(this.tokenService.getToken('user')!)
    this.userService.getUserById(id).subscribe(result => {
      this.userProfile = result.data;
      console.info(this.userProfile)
      this.formProfile.patchValue({
        firstName: this.userProfile.firstname,
        lastName: this.userProfile.lastname,
        email: this.userProfile.email,
        birthDate: this.userProfile.birthDate,
        numberId: this.userProfile.numberId,
        phonenumber: this.userProfile.phonenumber,
        typeId: this.userProfile.typeId
      });
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      // The 'result' property of the reader object contains the base64-encoded image data
      const base64Data = reader.result;
      console.info(file)
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        base64: base64Data,
        index: 0
      }
      const {id} = JSON.parse(this.tokenService.getToken('user')!)
      this.userService.uploadImage(id, fileData).subscribe(result => {
           console.info(result)
         })
    };
    reader.readAsDataURL(file);


  }

  onSubmit(): void {

  }

}
