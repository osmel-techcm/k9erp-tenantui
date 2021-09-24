import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { PaginatorData } from '../models/PaginatorData';
import { responseData } from '../models/responseData';
import { Entity } from '../models/entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getCustomers(paginatorData: PaginatorData){
    return this.http.get<responseData>(this._global.apiUrl + "api/Customers?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending)
  }

  postCustomer(customer: Entity) {
    return this.http.post<responseData>(this._global.apiUrl + "api/Customers", customer)
  }

  getCustomer(id: number) {
    return this.http.get<responseData>(this._global.apiUrl + "api/Customers/" + id)
  }

  putCustomer(customer: Entity) {
    return this.http.put<responseData>(this._global.apiUrl + "api/Customers/" + customer.id, customer)
  }
}
