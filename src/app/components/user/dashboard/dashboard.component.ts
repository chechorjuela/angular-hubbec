import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {IHobbieService} from "../../../services/hobbie/hobbie.service";
import {TokenService} from "../../../services/token/token.service";
import {ModalHobbieComponent} from "../../shared/modal-hobbie/modal-hobbie.component";
import {finalize} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {NgToastService} from "ng-angular-popup";
import {ModalConfirmDeleteComponent} from "../../shared/modal-confirm-delete/modal-confirm-delete.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userId = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['position', 'name', 'weight', 'actions'];
  dataSource = [];

  constructor(
    private toast: NgToastService,
    public dialog: MatDialog,
    private tokenSerivce: TokenService,
    private paginatorIntl: MatPaginatorIntl,
    private hobbieService: IHobbieService
  ) {
  }

  ngOnInit(): void {
    this.loadHobbiesDash();
  }
/**
 * Color 1: #B51700
 * Color 2: #171447
 * Color 3: #434343
 * Color 4: #B8B6B6
 * Color 5: #FFFFFF
 * **/
  loadHobbiesDash():void {
    const {id} = JSON.parse(this.tokenSerivce.getToken('user')!);
    this.userId = id;
    this.hobbieService.getAll().subscribe(result => {
      this.dataSource = result.data.data;
    })
  }

  editRow(row: any): void {
    const dialogRef = this.dialog.open(ModalHobbieComponent, {
      width: '400px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hobbieService.updateHobbie(row.id, result).pipe(
          finalize(() => {
            this.loadHobbiesDash();
          })
        ).subscribe(result => {
          this.toast.success({detail: "Hobbie", summary: "Hobbie actualizado correctamente", duration: 5000})
        })
      }
    })
  }

  deleteRow(row: any): void {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      width: '400px',
      data: {
        title: 'Eliminar',
        description: 'Desea eliminar el hobbie?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hobbieService.deleteHobbie(row.id).pipe(
          finalize(() => {
            this.loadHobbiesDash();
          })
        ).subscribe(result => {
          this.toast.success({detail: "Hobbie", summary: "Hobbie eliminado correctamente", duration: 5000})
        })
        // delete action
      }
    });
  }

  onPageChange(event: any) {
  }
}
