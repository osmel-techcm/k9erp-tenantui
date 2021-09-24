import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { PaginatorData } from '../models/PaginatorData';
import { responseData } from '../models/responseData';
import { Entity } from '../models/entity';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getVendors(paginatorData: PaginatorData){
    return this.http.get<responseData>(this._global.apiUrl + "api/Vendors?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending)
  }

  postVendor(vendor: Entity) {
    return this.http.post<responseData>(this._global.apiUrl + "api/Vendors", vendor)
  }

  getVendor(id: number) {
    return this.http.get<responseData>(this._global.apiUrl + "api/Vendors/" + id)
  }

  putVendor(vendor: Entity) {
    return this.http.put<responseData>(this._global.apiUrl + "api/Vendors/" + vendor.id, vendor)
  }
}
