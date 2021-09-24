import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { Class } from '../models/class';
import { PaginatorData } from '../models/PaginatorData';
import { responseData } from '../models/responseData';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getClasses(paginatorData: PaginatorData){
    return this.http.get<responseData>(this._global.apiUrl + "api/Classes?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending)
  }

  postClass(_class: Class) {
    return this.http.post<responseData>(this._global.apiUrl + "api/Classes", _class)
  }

  getClass(id: number) {
    return this.http.get<responseData>(this._global.apiUrl + "api/Classes/" + id)
  }

  putClass(_class: Class) {
    return this.http.put<responseData>(this._global.apiUrl + "api/Classes/" + _class.id, _class)
  }
  
}
