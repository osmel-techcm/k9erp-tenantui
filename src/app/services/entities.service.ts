import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { PaginatorData } from '../models/PaginatorData';
import { responseData } from '../models/responseData';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getEntities(paginatorData: PaginatorData){
    return this.http.get<responseData>(this._global.apiUrl + "api/Entities?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending)
  }
}
