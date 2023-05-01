import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IUserService} from "../../../services/user/user.service.service";
import {TokenService} from "../../../services/token/token.service";
import {ProfileRequestDto} from "../../../Domain/dto/responseDto/profile.respose.dto";
import {TypeId} from "../../../../helpers/enums/typeId.enum";
import {environment} from "../../../../helpers/enviroments/enviroment";
import {debounceTime, delay, distinctUntilChanged, finalize, Observable, Subject, switchMap} from "rxjs";
import {NgToastService} from "ng-angular-popup";
import {WebcamImage} from "ngx-webcam";
import {KindFiles} from "../../../../helpers/enums/kind-files";

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
  urlImage = environment.API_URL;
  // @ts-ignore
  typeIdOptions = Object.keys(TypeId).map(key => ({label: key, value: TypeId[key]}));

  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  private trigger: Subject<any> = new Subject();

  constructor(
    private toast: NgToastService,
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
    this.userService.getUserById(id).pipe(
      delay(500) // delay the emission by 1 second
    ).subscribe(result => {
      this.userProfile = result.data;
      this.tokenService.saveUser(result.data);
      this.urlImage = environment.API_URL;
      this.urlImage = this.userProfile.profile_image ? `${this.urlImage}/api/filePath/user/${this.userProfile.id}/${this.userProfile.profile_image}` : '';
      this.formProfile.patchValue({
        firstName: this.userProfile.firstname,
        lastName: this.userProfile.lastname,
        email: this.userProfile.email,
        birthDate: this.userProfile.birthDate,
        expeditionDate: this.userProfile.expeditionDate,
        numberId: this.userProfile.numberId,
        phonenumber: this.userProfile.phonenumber,
        typeId: this.userProfile.typeId,
        country: this.userProfile.country,
        city: this.userProfile.city,
        address: this.userProfile.address,
      });
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result;
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        base64: base64Data,
        index: 0
      }
      const {id} = JSON.parse(this.tokenService.getToken('user')!)
      this.userService.uploadImage(id, fileData).pipe(
        finalize(() => {
          this.loadDataForm();
        })
      ).subscribe(result => {
        this.toast.success({detail: "Imagen", summary: "Se ha subido la imagen", duration: 5000})
      })
    };
    reader.readAsDataURL(file);

  }

  onSubmit(): void {
    const {id} = JSON.parse(this.tokenService.getToken('user')!)
    this.userService.updateProfile(id, this.formProfile.value).subscribe((next) => {

      this.toast.success({detail: "Actualización", summary: "Usuario ha sido actualizado", duration: 5000})
    }, (error) => {
      this.toast.error({detail: "Server", summary: "Ups! hubo un error", duration: 5000})
    })

  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    const mimeType = webcamImage.imageAsDataUrl.split(";")[0].split(":")[1];
    const binaryData = atob(webcamImage.imageAsDataUrl.split(',')[1]);
    const fileSizeInBytes = binaryData.length;
    // @ts-ignore
    const kindFile = KindFiles[mimeType];
    const fileData = {
      name: `imageProfile.${kindFile}`,
      type: mimeType,
      size: fileSizeInBytes,
      base64: webcamImage.imageAsDataUrl,
      index: 0
    }
    const {id} = JSON.parse(this.tokenService.getToken('user')!)
  this.userService.uploadImage(id, fileData).pipe(
      finalize(() => {
        this.loadDataForm();
      })
    ).subscribe(result => {
      this.toast.success({detail: "Imagen", summary: "Se ha subido la imagen", duration: 5000})
    })
  }
}
