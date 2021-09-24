import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Globals } from 'src/app/config/globals';
import { EntityType } from 'src/app/models/entityType';
import { PaginatorData } from 'src/app/models/PaginatorData';
import { ListSearchService } from 'src/app/services/list-search.service';

interface field {
  colSize: number;
  display: boolean;
  field: string;
  name: string;
  order: number;
  type: string;
  sort: string;
}

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.scss']
})
export class ListSearchComponent implements OnInit {

  @Input() entityType: EntityType;

  constructor(private _router: Router, public _globals: Globals, private _listSearchService: ListSearchService) { }  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource()
  displayedColumns: string[]

  paginatorData = new PaginatorData()
  isLoadingResults: boolean = true
  filterColumns = {}
  fields: field[]

  ngOnInit(): void {
    this.paginatorData.PageSize = 25
    this.paginatorData.filterDataSt = ""
    this.paginatorData.orderField = this.entityType.orderField ?? 'name'
    this.paginatorData.descending = false
    this.loadData(true)
  }
  
  loadData(updateFields: boolean){
    this._listSearchService.getData(this.entityType.id, this.paginatorData).subscribe(
      data => {
        if (!data.error) {          
          if(updateFields){     
            this.fields = data.data.fields
          }             
          this.displayedColumns = this.fields.filter(f => f.display).map(p => p.name)
          this.dataSource = new MatTableDataSource<any>(data.data.rows)
          this.paginator.pageSize = this.paginatorData.PageSize
          this.paginator.length = +data.data.totalCount          
        } else {
          console.log(data.data)
        }
      },
      err => {
        console.log(err)
      },
      () => {
        this.isLoadingResults = false
      }
    )
  }

  openById(id){
    this._router.navigate(['/mainview/' + this.entityType.childRouter + '/' + id]);
  }

  filterResults() {
    this.paginatorData.filterDataSt = JSON.stringify(this.filterColumns)
    this.loadData(false)
  }

  paginatorChanged(evt: any){
    this.paginatorData.PageSize = evt.pageSize
    this.paginatorData.PageNumber = evt.pageIndex + 1
    this.loadData(false)
  }

  sortData(col: any){

    this.paginatorData.orderField = col.field

    if (!col.sort) {
      col.sort = 'asc'
      this.paginatorData.descending = false
    } else if (col.sort === 'asc'){
      col.sort = 'desc'
      this.paginatorData.descending = true
    } else if (col.sort === 'desc'){
      col.sort = null
      this.paginatorData.descending = false
      this.paginatorData.orderField = this.entityType.orderField ?? 'name'
    }

    this.fields.filter(d => d.field !== this.paginatorData.orderField).map(o => {
      o.sort = ''
    })

    this.loadData(false)

  }

  trackElement(index: number, element: field) {
    return element ? element.field : null
  }

}
