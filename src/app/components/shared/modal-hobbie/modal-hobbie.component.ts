import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal-hobbie',
  templateUrl: './modal-hobbie.component.html',
  styleUrls: ['./modal-hobbie.component.scss']
})
export class ModalHobbieComponent {
  formHobbie!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalHobbieComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  ngOnInit() {
    this.formHobbie = this.formBuilder.group({
      nameHobbie: [this.data.nameHobbie, Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // save item data and close dialog
    if(this.formHobbie.valid){
      this.dialogRef.close(this.formHobbie.value);
    }
  }
}
