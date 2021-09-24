import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { Comparison } from 'src/app/models/comparison';
import { FiltersReport } from 'src/app/models/filtersReport';
import { PaginatorData } from 'src/app/models/PaginatorData';
import { Report } from 'src/app/models/report';
import { EntitiesService } from 'src/app/services/entities.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports-details',
  templateUrl: './reports-details.component.html',
  styleUrls: ['./reports-details.component.scss']
})
export class ReportsDetailsComponent implements OnInit {

  report = new Report()
  listComparison: Comparison[]
  _filtersReports: FiltersReport[] = []
  paginatorData = new PaginatorData()
  htmlReport: any

  constructor(private _reportsService: ReportsService, private _router: Router, private route: ActivatedRoute, private _entitiesService: EntitiesService, 
    private sanitizer: DomSanitizer, private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this.report = this._reportsService.getReportById(+param.get('id'))
        this.loadComparisons()
      }
    )
  }

  loadComparisons() {
    this._reportsService.getComparisons().subscribe(
      data => {
        this.listComparison = data.data
        this.addFilters()
      }
    )
  }

  addFilters(){
    switch (this.report.id) {
      case 1:

        break;
      case 2:        

        break;
      case 3:        

        break;
      case 4:        

        break;
    }
  }

  addFilter(name: string, comparison: number[], inputType: string, dataSource:string, valueComparison: number, dataSourceField: string){    
    
    let listComparisonData = this.filterComparison(comparison)  

    let indexComparison = listComparisonData.findIndex(x=> x.id ==  valueComparison)

    let _filterReport : FiltersReport = {
      name: name,
      listComparisonData: listComparisonData,
      inputType: inputType,
      valueComparison: valueComparison,
      primaryValue: inputType == 'datepicker' ? listComparisonData[indexComparison].initialDate.toString() : null,
      secondaryValue: inputType == 'datepicker' ? listComparisonData[indexComparison].endDate.toString() : null,
      dataSourceField: dataSourceField,
      dataSourceName: dataSource
    }

    this.getDataSource(_filterReport)

    this._filtersReports.push(_filterReport)

  }

  filterComparison(comparison: number[]) {
    let results: Comparison[] = []
    this.listComparison.forEach(x => {      
      if (comparison.indexOf(x.id) >= 0) {
        results.push(x)
      }
    })
    return results
  }

  updateValue(filt: FiltersReport){    
    if (filt.inputType == 'datepicker') {
      let indexComparison = filt.listComparisonData.findIndex(x=> x.id ==  filt.valueComparison)
      filt.primaryValue = filt.listComparisonData[indexComparison].initialDate.toString()
      filt.secondaryValue = filt.listComparisonData[indexComparison].endDate.toString()
    }
  }

  getDataSource(filterReport: FiltersReport) {

    let name = filterReport.primaryValue ?? ''
    this.paginatorData.PageSize = 25
    this.paginatorData.filterDataSt = "{'name':'" + name + "'}"
    this.paginatorData.orderField = 'name'
    this.paginatorData.descending = false

    switch (filterReport.dataSourceName) {
      case 'entities':
        this._entitiesService.getEntities(this.paginatorData).subscribe(
          data => {
            filterReport.dataSource = data.data.rows
          }
        )
        break;
    }
  }

  checkBlur(property: string, data: Array<any>, field: string, fieldUpd: string, row: any) {
    if(!row[property]){
      row[property] = null
      row[fieldUpd] = 0
      return
    }

    var itemExist = data.find( e => e[field].toLowerCase() == row[property].toLowerCase())

    if (itemExist) {
      row[property] = itemExist[field]
      row[fieldUpd] = itemExist.id      
    } else {
      row[property] = null
      row[fieldUpd] = 0
    }
  }

  runReport(){
    this._reportsService.runReport(this.report.id, this._filtersReports).subscribe(
      data => {
        this.htmlReport = this.sanitizer.bypassSecurityTrustHtml(data.data)
      }
    )
  }

  goToReportList(){
    this._router.navigate(['/mainview/reports'])
  }

  exportToExcel(){
    this._reportsService.downloadReport(this.report.id, this._filtersReports).subscribe(
      data => {
        let blob = new Blob([data], { type: 'application/octet-stream' })
        FileSaver.saveAs(blob, this.report.name +  '.xlsx');
      }
    )
  }

  openSnackBar(message: string, action: string, type: number = 1, duration: number = 2000) {    
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: type == 0 ? ['green-snackbar'] : ['red-snackbar']
    });
  }

}
