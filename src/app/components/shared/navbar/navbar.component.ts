import {Component} from '@angular/core';
import {TokenService} from "../../../services/token/token.service";
import {Router} from "@angular/router";
import {ModalConfirmDeleteComponent} from "../modal-confirm-delete/modal-confirm-delete.component";
import {finalize} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ModalHobbieComponent} from "../modal-hobbie/modal-hobbie.component";
import {IAuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private authService: IAuthService,
    private route: Router
  ) {
  }

  closeSession(): void {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      width: '400px',
      data: {
        title: 'Cerrar seccion',
        description: 'Desea cerrar seccion en esta cuenta?'
      },
    });

    dialogRef.afterClosed().pipe(
      finalize(() => {
      })
    ).subscribe(result => {
      if (result) {
        //this.authService.logout();

        this.route.navigate(['/'])
      }
    });
  }
}
