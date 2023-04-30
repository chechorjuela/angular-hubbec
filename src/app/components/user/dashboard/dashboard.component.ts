import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {IHobbieService} from "../../../services/hobbie/hobbie.service";
import {TokenService} from "../../../services/token/token.service";


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
    private tokenSerivce: TokenService,
    private paginatorIntl: MatPaginatorIntl,
    private hobbieService: IHobbieService
  ) {
  }

  ngOnInit(): void {
    const {id} = JSON.parse(this.tokenSerivce.getToken('user')!);
    this.userId = id;
    this.hobbieService.getAll().subscribe(result => {
      this.dataSource = result.data.data;
    })
  }

  editRow(row: any): void {

  }

  deleteRow(row: any): void {

  }

  onPageChange(event: any) {
  }
}
