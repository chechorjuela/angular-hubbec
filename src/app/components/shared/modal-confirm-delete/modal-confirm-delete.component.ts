import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm-delete',
  templateUrl: './modal-confirm-delete.component.html',
  styleUrls: ['./modal-confirm-delete.component.scss']
})
export class ModalConfirmDeleteComponent {
  titleModal = 'Delete Confirmation';
  descriptionModal = 'Are you sure you want to delete this item?'

  constructor(public dialogRef: MatDialogRef<ModalConfirmDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.titleModal = data.title ? data.title : this.titleModal;
    this.descriptionModal = data.description ? data.description : this.descriptionModal;
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  delete(): void {
    this.dialogRef.close(true);
  }
}
