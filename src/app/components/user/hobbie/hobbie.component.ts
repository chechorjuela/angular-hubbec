import {Component, OnInit} from '@angular/core';
import {IHobbieService} from "../../../services/hobbie/hobbie.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmDeleteComponent} from "../../shared/modal-confirm-delete/modal-confirm-delete.component";
import {ModalHobbieComponent} from "../../shared/modal-hobbie/modal-hobbie.component";
import {TokenService} from "../../../services/token/token.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-hobbie',
  templateUrl: './hobbie.component.html',
  styleUrls: ['./hobbie.component.scss']
})
export class HobbieComponent implements OnInit {
  displayedColumns = ['id', 'nameHobbie', 'userId', 'create_at', 'update_at', 'actions'];
  dataSource = [];
  userId!: string;

  constructor(
    public dialog: MatDialog,
    public tokenService: TokenService,
    private hobbieService: IHobbieService) {
  }

  ngOnInit(): void {
    const {id} = JSON.parse(this.tokenService.getToken('user')!);
    this.userId = id;
    this.getHobbieUser();
  }

  getHobbieUser() {
    this.hobbieService.getHobbieByUser(this.userId).pipe(
      finalize(() => {
      })
    ).subscribe(result => {
      this.dataSource = result.data;

    })
  }

  addModal(): void {
    const dialogRef = this.dialog.open(ModalHobbieComponent, {
      width: '400px',
      data: { /* optional data to pass to the modal component */}
    });

    dialogRef.afterClosed().subscribe(result => {

      result.user_id = this.userId;
      this.hobbieService.createHobbie(result).pipe(
        finalize(() => {
          this.getHobbieUser();
        })
      ).subscribe(response => {

        console.info(response)
      });
    });
  }

  editRow(row: any): void {
    const dialogRef = this.dialog.open(ModalHobbieComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.info(result)
      this.hobbieService.updateHobbie(row.id, result).pipe(
        finalize(() => {
          this.getHobbieUser();
        })
      ).subscribe(result => {

      })
    })
  }

  onPageChange(event: any) {
  }

  deleteHobbie(row: any) {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hobbieService.deleteHobbie(row.id).pipe(
          finalize(() => {
            this.getHobbieUser();
          })
        ).subscribe(result => {

        })
        // delete action
      }
    });
  }

}
