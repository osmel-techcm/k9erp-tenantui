import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { PaginatorData } from '../models/PaginatorData';
import { responseData } from '../models/responseData';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getUnits(paginatorData: PaginatorData){
    return this.http.get<any>(this._global.apiUrl + "api/Units?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending)
  }

  postUnit(unit: Unit) {
    return this.http.post<responseData>(this._global.apiUrl + "api/Units", unit)
  }

  getUnit(id: number) {
    return this.http.get<responseData>(this._global.apiUrl + "api/Units/" + id)
  }

  putUnit(unit: Unit) {
    return this.http.put<responseData>(this._global.apiUrl + "api/Units/" + unit.id, unit)
  }
}
