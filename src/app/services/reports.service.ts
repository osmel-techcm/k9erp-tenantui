import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { FiltersReport } from '../models/filtersReport';
import { Report } from '../models/report';
import { responseData } from '../models/responseData';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private reports: Report[] = [
    { id: 1, name: 'Logs per Personnels & Clients' },
    { id: 2, name: 'Fobs per Personnels & Clients' },
    { id: 3, name: 'Personnels & Clients per Doors' },
    { id: 4, name: 'Door Status' }
  ]

  constructor(private http: HttpClient, private _global: Globals) { }

  getReportList():Report[] {
    return this.reports;
  }

  getReportById(id: number):Report {
    return this.reports.find(x=>x.id == id) 
  }

  getComparisons(){
    return this.http.get<responseData>(this._global.apiUrlReport + "api/Reports/GetComparisons")
  }

  runReport(reportId: number, filters: FiltersReport[]){
    return this.http.post<responseData>(this._global.apiUrlReport + "api/Reports/RunReport?reportId=" + reportId, filters)
  }

  downloadReport(reportId: number, filters: FiltersReport[]){
    return this.http.post<any>(this._global.apiUrlReport + "api/Reports/DownloadReport?reportId=" + reportId, filters, {
      responseType: 'blob' as 'json'
    })
  }

}
