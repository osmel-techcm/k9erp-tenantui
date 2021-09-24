import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Report } from 'src/app/models/report';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Report>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, private _reportsService: ReportsService) {
    this.dataSource = new MatTableDataSource(this._reportsService.getReportList());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openReportDetails(id: number){
    this._router.navigate(['/mainview/reports/' + id]);
  }

}
