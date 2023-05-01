import {Component, OnInit} from '@angular/core';
import {IHobbieService} from "../../../services/hobbie/hobbie.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmDeleteComponent} from "../../shared/modal-confirm-delete/modal-confirm-delete.component";
import {ModalHobbieComponent} from "../../shared/modal-hobbie/modal-hobbie.component";
import {TokenService} from "../../../services/token/token.service";
import {finalize} from "rxjs";
import {NgToastService} from "ng-angular-popup";
import {SocketService} from "../../../../helpers/utils/socket.service";

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
    private socketService: SocketService,
    private toast: NgToastService,
    public dialog: MatDialog,
    public tokenService: TokenService,
    private hobbieService: IHobbieService) {
    this.socketService.connect();
  }

  ngOnInit(): void {
    const {id} = JSON.parse(this.tokenService.getToken('user')!);
    this.userId = id;
    this.getHobbieUser();
    this.socketService.on('connect').subscribe(()=>{
      console.log('Conexión establecida');
    });
    this.socketService.on('listHobbie').subscribe((data) => {
      alert(data)
    });
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
        this.socketService.emit('listHobbie', {data: response});
        this.toast.success({detail: "Hobbie", summary: "Hobbie agregado correctamente", duration: 5000})
      });
    });
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
            this.getHobbieUser();
          })
        ).subscribe(result => {
          this.toast.success({detail: "Hobbie", summary: "Hobbie actualizado correctamente", duration: 5000})
        })
      }
    })
  }

  onPageChange(event: any) {
  }

  deleteHobbie(row: any) {
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
            this.getHobbieUser();
          })
        ).subscribe(result => {
          this.toast.success({detail: "Hobbie", summary: "Hobbie eliminado correctamente", duration: 5000})
        })
        // delete action
      }
    });
  }

  public ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
